document.getElementById('paymentForm').addEventListener('submit', async(e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const formDataObject = {};
    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });

    const jsonData = JSON.stringify(formDataObject);

    try{
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        });

        if (response.ok) {
            const responseBody = await response.text();
            document.getElementById('submitStatus').innerHTML = responseBody;
        } else {
            
        }
    } catch (error) {
        console.error('Error: ', error);
    }

});