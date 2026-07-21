from pathlib import Path

path = Path("src/components/landing/Hero.jsx")
text = path.read_text()

# Badge
text = text.replace(
    "Salon management and growth, in one place",
    "Business Growth Platform"
)

# Heading
old_heading = """The smarter way to
              <span className="text-purple-700"> run and grow </span>
              your salon."""

new_heading = """Build your website.
              <span className="text-purple-700"> Manage your business. </span>
              Grow with confidence."""

text = text.replace(old_heading, new_heading)

# Description
old_description = """Retivio brings customers, appointments, follow-ups, billing
              and business growth into one connected platform built for
              modern salons."""

new_description = """Retivio combines professional website solutions, salon CRM and
              marketing tools into one platform, helping businesses build
              their online presence, manage daily operations and grow with
              confidence."""

text = text.replace(old_description, new_description)

# Primary CTA
text = text.replace(">\\n                Start free", ">\\n                Get Started")

# Secondary CTA
text = text.replace("Explore products", "Explore Solutions")

# Bottom highlights
old_list = """[
                "No credit card required",
                "Built for salons",
                "Start in minutes",
              ]"""

new_list = """[
                "Website Solutions",
                "Salon CRM",
                "Marketing",
              ]"""

text = text.replace(old_list, new_list)

# Remove check icon import if no longer used later
text = text.replace("  Check,\n", "")

path.write_text(text)

print("Hero messaging updated successfully.")
