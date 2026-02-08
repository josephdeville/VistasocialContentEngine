#!/usr/bin/env python3
"""
Process all 105 companies from Funding round Companies.csv
Maps each to playbook type, personas, and value props
"""

import csv
import re

# Playbook mapping logic based on ICP and stage
def determine_playbook(company_data):
    """Determine best playbook type based on ICP, funding, industry"""
    icp = company_data.get('ICP', '').lower()
    value_prop = company_data.get('Value_Proposition', '').lower()
    personas = company_data.get('Personas', '').lower()

    # Milestone playbooks (stage-based)
    if 'series e' in icp or 'series d' in icp or 'unicorn' in icp or '$1b' in icp:
        return ("Milestone - Late-Stage Scaling", "Large enterprise scaling operations")
    elif 'series b' in icp or 'series c' in icp or '5-20m arr' in icp:
        return ("Milestone - Series B/C Scaling", "Mid-stage scaling through RevOps chaos")
    elif 'series a' in icp or 'early-stage' in icp or 'seed' in icp:
        return ("Milestone - Series A Growth", "Early-stage building GTM infrastructure")

    # Practitioner playbooks (role-based)
    elif 'head of growth' in personas or 'growth market' in personas:
        return ("Practitioner - Head of Growth", "Growth marketing and experimentation")
    elif 'vp revenue' in personas or 'revops' in personas:
        return ("Practitioner - VP Revenue Ops", "Revenue operations and attribution")
    elif 'customer success' in personas:
        return ("Practitioner - VP Customer Success", "CS scaling and retention automation")
    elif 'product manager' in personas or 'head of product' in personas:
        return ("Practitioner - VP Product", "Product analytics and instrumentation")

    # Sector playbooks (industry-specific)
    elif 'healthcare' in icp or 'medical' in icp or 'hospital' in icp:
        return ("Sector - HealthTech", "Healthcare-specific compliance and workflows")
    elif 'fintech' in icp or 'financial services' in icp or 'banking' in icp:
        return ("Sector - FinTech", "Financial services compliance and security")
    elif 'crypto' in icp or 'web3' in icp or 'blockchain' in icp:
        return ("Sector - Web3/Crypto", "Decentralized infrastructure and DeFi")
    elif 'devops' in icp or 'platform engineering' in icp or 'sre' in icp:
        return ("Sector - DevOps/Infrastructure", "Engineering operations and cloud")

    # Default to general B2B SaaS
    else:
        return ("Practitioner - General B2B SaaS", "B2B SaaS growth and operations")

def generate_value_props(company_data):
    """Generate 3 named value props based on ICP pain points"""
    icp = company_data.get('ICP', '')
    value_prop = company_data.get('Value_Proposition', '')

    # Extract key pain points from value prop
    props = []

    # Common patterns
    if 'automate' in value_prop.lower():
        props.append("The Manual Process Tax - Spending 20+ hrs/week on work that should be automated")
    if 'scale' in value_prop.lower() or 'scaling' in value_prop.lower():
        props.append("The Scaling Wall - What worked at 10X breaks at 100X")
    if 'attribution' in value_prop.lower() or 'visibility' in value_prop.lower():
        props.append("The Attribution Black Hole - Can't connect activity to revenue")
    if 'data' in value_prop.lower() or 'analytics' in value_prop.lower():
        props.append("The Data Silo Problem - Critical data trapped in disconnected tools")
    if 'cost' in value_prop.lower() or 'expensive' in value_prop.lower():
        props.append("The Cost Creep Crisis - Spend growing 3x faster than efficiency")
    if 'fraud' in value_prop.lower() or 'security' in value_prop.lower():
        props.append("The Security-UX Tradeoff - Lock down systems OR keep users happy")

    # Fill to 3 props
    while len(props) < 3:
        props.append(f"The {company_data['Company Name']} Challenge - Specific pain point TBD")

    return props[:3]

def extract_personas(company_data):
    """Extract 3 target personas focusing on GTM roles"""
    personas_str = company_data.get('Personas', '')

    # Priority mapping to GTM roles
    gtm_roles = []

    if 'head of growth' in personas_str.lower() or 'growth market' in personas_str.lower():
        gtm_roles.append("Head of Growth")
    if 'head of marketing' in personas_str.lower() or 'cmo' in personas_str.lower():
        gtm_roles.append("VP of Marketing")
    if 'revenue' in personas_str.lower() or 'revops' in personas_str.lower():
        gtm_roles.append("VP Revenue Operations")
    if 'demand gen' in personas_str.lower():
        gtm_roles.append("Head of Demand Generation")
    if 'head of sales' in personas_str.lower() or 'vp sales' in personas_str.lower():
        gtm_roles.append("VP of Sales")
    if 'customer success' in personas_str.lower():
        gtm_roles.append("VP of Customer Success")
    if 'product manager' in personas_str.lower() or 'head of product' in personas_str.lower():
        gtm_roles.append("VP of Product")
    if 'partnerships' in personas_str.lower():
        gtm_roles.append("Head of Partnerships")

    # Default to common GTM roles if not enough found
    default_roles = ["Head of Growth", "VP of Marketing", "Head of Demand Generation"]

    while len(gtm_roles) < 3:
        for role in default_roles:
            if role not in gtm_roles:
                gtm_roles.append(role)
                if len(gtm_roles) >= 3:
                    break

    return gtm_roles[:3]

def generate_email_subject(company_data, playbook_type):
    """Generate personalized email subject line"""
    company = company_data['Company Name']

    subjects = {
        "Milestone - Series B/C Scaling": f"Your Series B just made RevOps your #1 bottleneck",
        "Milestone - Late-Stage Scaling": f"At your scale, every process breaks twice",
        "Practitioner - Head of Growth": f"Your experimentation backlog is growing faster than insights",
        "Practitioner - VP Revenue Ops": f"Your attribution model can't answer the board's questions",
        "Sector - HealthTech": f"Healthcare compliance is slowing your product velocity",
        "Sector - FinTech": f"Every new regulation adds 3 months to your roadmap"
    }

    # Match playbook type to subject
    for key in subjects:
        if key in playbook_type:
            return subjects[key]

    return f"Your {company} growth is outpacing your operations"

# This is a template - actual processing would read the CSV
print("Processing logic ready - use this to batch process all 105 companies")
