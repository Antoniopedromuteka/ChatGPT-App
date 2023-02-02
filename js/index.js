const inputQuestion = document.getElementById('inputQuestion');
const result = document.getElementById("result");

const OPENAI_API_KEY = "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"

inputQuestion.addEventListener("keypress", (e)=>{
    if(inputQuestion.value && e.key === "Enter")
    sendQuestion()
})


function sendQuestion(){
    const sQuestion = inputQuestion.value

    fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + OPENAI_API_KEY,
        },
        body: JSON.stringify({
        model: "text-davinci-003",
        prompt: sQuestion,
        max_tokens: 2048,
        temperature: 0.5, 
        }),
    }).then(response => response.json())
    .then((json) => {
        if(result.value) result.value += "\n";

        if(json.error?.message) {
            result.value += `Error ${json.error.message}`;
            return
        }
        if(json.choices?.[0].text){
            const text  = json.choices[0].text || "Sem resposta";
            result.value += "Chat GPT: " + text;
        }
    })
    .catch((err) => console.log(err))
    .finally(() => {
        inputQuestion.value = "";
        inputQuestion.disabled = false;
        inputQuestion.focus();
    })

    if(result.value) result.value += "\n\n\n";

    result.value += `Eu: ${sQuestion}`;
    inputQuestion.value = "Carregando...";
    inputQuestion.disabled = true;

    result.scrollTo = result.scrollHeight; 

}