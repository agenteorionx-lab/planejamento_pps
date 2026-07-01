document.addEventListener("DOMContentLoaded", () => {
    const leadForm = document.getElementById("lead-form");

    if (leadForm) {
        leadForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const emailInput = document.getElementById("email");
            const emailValue = emailInput.value.trim().toLowerCase();

            // Validação rígida: aceita apenas e-mails que terminam com @gmail.com
            if (!emailValue.endsWith("@gmail.com")) {
                alert("Por favor, preencha com um e-mail válido do Gmail (exemplo@gmail.com).");
                emailInput.focus();
                return;
            }

            // URL do webhook do n8n para registrar o e-mail na planilha
            const webhookUrl = "https://webhook-n8n.orionxbrasil.com.br/webhook/formulario_holdings";

            // Obtém data e hora atuais do preenchimento
            const dataHora = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

            // Envia os dados de forma assíncrona para o n8n
            fetch(webhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    email: emailValue,
                    data_hora: dataHora
                })
            })
            .then(() => {
                // Após o envio com sucesso do lead, redireciona para o grupo de WhatsApp
                const whatsappGroupUrl = "https://chat.whatsapp.com/GzB9o6bH5yX7K8L2M3N4O5";
                window.location.href = whatsappGroupUrl;
            })
            .catch((error) => {
                console.error("Erro ao enviar webhook:", error);
                // Mesmo em caso de falha de conexão do webhook, redireciona o usuário para não quebrar a conversão
                const whatsappGroupUrl = "https://chat.whatsapp.com/GzB9o6bH5yX7K8L2M3N4O5";
                window.location.href = whatsappGroupUrl;
            });
        });
    }
});
