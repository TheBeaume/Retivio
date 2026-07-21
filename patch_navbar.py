from pathlib import Path

file = Path("src/components/landing/Navbar.jsx")
text = file.read_text()

# Navigation items
old = """const navItems = [
  { label: "Product", href: "/#product" },
  { label: "Solutions", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Products", href: "/#products" },
  { label: "FAQ", href: "/#faq" },
];"""

new = """const navItems = [
  { label: "Solutions", href: "/#products" },
  { label: "Industries", href: "/#industries" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Resources", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];"""

text = text.replace(old, new)

text = text.replace("Start free", "Get Started")
text = text.replace("Log in", "Login")
text = text.replace("Blog", "Resources")

file.write_text(text)

print("Navbar updated successfully.")
