document.addEventListener("DOMContentLoaded", () => {
    const leadForm = document.getElementById("lead-form");

    if (leadForm) {
        leadForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const emailInput = document.getElementById("email");
            const emailValue = emailInput.value.trim();

            if (emailValue) {
                // Simulação de salvar lead / integração
                console.log("Lead capturado:", emailValue);

                // Redireciona o usuário para o grupo de WhatsApp (Link fictício / placeholder para ser configurado)
                // Substitua a URL abaixo pelo link real do grupo de WhatsApp da campanha
                const whatsappGroupUrl = "https://chat.whatsapp.com/GzB9o6bH5yX7K8L2M3N4O5";
                
                // Abre o link em uma nova aba ou na mesma
                window.location.href = whatsappGroupUrl;
            }
        });
    }
});
