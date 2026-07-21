from pathlib import Path
import shutil

file_path = Path("src/components/NewCustomerForm.jsx")

if not file_path.exists():
    print("❌ File not found:", file_path)
    raise SystemExit(1)

# Backup
backup_path = file_path.with_suffix(".jsx.bak_bug005")
shutil.copy(file_path, backup_path)
print(f"✅ Backup created: {backup_path}")

content = file_path.read_text(encoding="utf-8")

old = """    const { data: exists } = await supabase
      .from("customers")
      .select("id")
      .eq("phone", phone);

    if (exists && exists.length > 0) {
      alert("Customer already exists");
      return;
    }
const {
  data: { user },
} = await supabase.auth.getUser();
"""

new = """    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please sign in again.");
      return;
    }

    const { data: exists, error: existsError } = await supabase
      .from("customers")
      .select("id")
      .eq("user_id", user.id)
      .eq("phone", phone);

    if (existsError) {
      alert(existsError.message);
      return;
    }

    if (exists && exists.length > 0) {
      alert("Customer already exists");
      return;
    }
"""

if old not in content:
    print("❌ Target block not found. Patch not applied.")
    raise SystemExit(1)

content = content.replace(old, new, 1)

file_path.write_text(content, encoding="utf-8")

print("✅ BUG-005 patch applied successfully.")
