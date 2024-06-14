document.getElementById('textForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const systemMessage = document.getElementById('systemMessage').value;
    const userMessage = document.getElementById('userText').value;
    const API_URL = 'https://api.awanllm.com/v1/chat/completions';
    const AWANLLM_API_KEY = "6c7086aa-dcfc-412a-b869-dedfb0ff422d";
    const prompt = "Extract all personal information such as names, addresses, phone numbers, emails, and other identifiers from the following text: " + userMessage;

    const data = {
        model: 'Awanllm-Llama-3-8B-Dolfin',
        messages: [
            { role: 'system', content: systemMessage },
            { role: 'user', content: prompt }
        ],
        repetition_penalty: 1.1,
        temperature: 0.7,
        top_p: 0.9,
        top_k: 40,
        max_tokens: 1024,
        stream: false // Set to true if you want to use streaming
    };

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${AWANLLM_API_KEY}`
        },
    };

    Swal.fire({
        title: 'Processing...',
        text: 'Please wait while we process your request.',
        didOpen: () => {
            Swal.showLoading();
        }
    });

    axios.post(API_URL, data, config)
        .then((response) => {
            Swal.close();
            const content = response.data.choices[0].message.content.trim();
            if (content) {
                document.getElementById('response').textContent = content;
            } else {
                document.getElementById('response').textContent = 'No personal information extracted.';
            }
        })
        .catch((error) => {
            Swal.close();
            console.error(error);
            Swal.fire('Error', 'An error occurred while processing your request.', 'error');
    });
});