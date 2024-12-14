document.getElementById("email-form").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent default form submission

    const email = e.target.email.value; // Get email from input

    const airtableAccessToken = "pathiyCQ4xmP96Gkj.1fed8f0f73b6e9fb4f1f9bcb7d951222adfbfed72ac0edf553dd75ea91049857";
    const airtableBaseId = "appoVVN4v32gYN2Ue";
    const airtableTableName = "Table";

    const url = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}`;
    const data = {
        records: [
            {
                fields: {
                    Email: email
                }
            }
        ]
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${airtableAccessToken}`, // Use the Personal Access Token
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            document.getElementById("status").textContent = "Email successfully added!";
            e.target.reset();
        } else {
            const errorDetails = await response.json();
            console.error(errorDetails);
            document.getElementById("status").textContent = "Error adding email. Try again.";
        }
    } catch (error) {
        console.error(error);
        document.getElementById("status").textContent = "Error connecting to Airtable.";
    }
});