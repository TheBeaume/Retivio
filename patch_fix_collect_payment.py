from pathlib import Path
import re

path = Path("src/components/payments/CollectPaymentModal.jsx")
text = path.read_text()

# Remove customer total_spend update block
pattern = r'''const \{ data: customer \} = await supabase
\s*\.from\("customers"\)
\s*\.select\("total_spend"\)
\s*\.eq\("id", appointment\.customer_id\)
\s*\.single\(\);

const newTotal =
\s*Number\(customer\?\.total_spend \|\| 0\) \+
\s*Number\(amount\);

await supabase
\s*\.from\("customers"\)
\s*\.update\(\{
\s*total_spend: newTotal,
\s*\}\)
\s*\.eq\("id", appointment\.customer_id\);'''

replacement = """// total_spend is maintained by the billing workflow.
// Do not update it again during payment collection to avoid double counting."""

new_text = re.sub(pattern, replacement, text, flags=re.MULTILINE)

if new_text == text:
    print("❌ Pattern not found. File may have changed.")
else:
    path.write_text(new_text)
    print("✅ CollectPayment total_spend update removed.")
