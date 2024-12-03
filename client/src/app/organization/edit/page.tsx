import EditCompanyDetailsForm from "./organization-edit-page";

export default function OrganizationEditPage() {
    return (
        <EditCompanyDetailsForm 
            initialData={{
                "name": "Crowd Strike",
                "website": "www.crowdstrike.com",
                "industry": "Cyber Security",
                "noOfEmployees": 500,
                "tagline": "We Stop Breaches!",
                "description": "CrowdStrike is an American cybersecurity technology company based in Austin, Texas. It provides endpoint security, threat intelligence, and cyberattack response services. Until July 2024 it was best known for deploying immediate updates upon detecting threats, distributing as many as 10-12 per day. Since then it has been offering phased or staggered update rollout.",
                "logo": "https://media.licdn.com/dms/image/v2/C560BAQFxQkzeHZxIYg/company-logo_200_200/company-logo_200_200/0/1633985771177/crowdstrike_logo?e=1740009600&v=beta&t=8duqSF0EAlEK6SB-UBNKPykiMqpXfZwXG8u7LhJWtGs",
            }}
        />
    )
}