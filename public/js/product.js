
document.addEventListener('DOMContentLoaded', () => {


document.querySelectorAll('.products-list a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1); // Get the target section ID
        const targetElement = document.getElementById(targetId); // Get the target element

        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    });
});


// chatbox

(function () {
    const chatbotHTML = `
        <button id="chatbot-launch-btn" class="fixed bottom-5 right-5 bg-indigo-500 rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-indigo-600 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
        </button>

        <div id="chatbot-modal" class="fixed bottom-24 right-5 w-80 bg-white rounded-lg shadow-2xl flex flex-col transition-all duration-300 ease-in-out transform translate-y-full opacity-0 invisible">
            <div class="bg-indigo-500 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
                <h4 class="font-semibold">Chatbot</h4>
                <div class="flex items-center space-x-2">
                    <button id="chatbot-restart-btn" class="text-white hover:text-gray-200 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4V1M4.93 4.93l1.42-1.42M1 12h3m16 0h3m-2.93 7.07l1.42 1.42M12 23v-3m7.07-7.07l1.42 1.42M21 12a9 9 0 11-9-9"/>
                        </svg>
                    </button>
                    <button id="chatbot-close-btn" class="text-white hover:text-gray-200 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
            <div id="chatbot-message-container" class="flex-grow overflow-y-auto p-4 space-y-2" style="max-height: 300px;">
                <!-- Chat messages will be appended here -->
            </div>
            <div class="p-4 border-t">
                <div class="flex space-x-2">
                    <input type="text" id="chatbot-input" class="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Type your message...">
                    <button id="chatbot-send-btn" class="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Inject the HTML into the component container
    document.getElementById('chatbot-component').innerHTML = chatbotHTML;

    const chatbotLaunchBtn = document.getElementById('chatbot-launch-btn');
    const chatbotModal = document.getElementById('chatbot-modal');
    const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
    const chatbotRestartBtn = document.getElementById('chatbot-restart-btn');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSendBtn = document.getElementById('chatbot-send-btn');
    const chatbotMessageContainer = document.getElementById('chatbot-message-container');

    let step = 0;
    let userInfo = {};

    function toggleChatbot() {
        chatbotModal.classList.toggle('translate-y-full');
        chatbotModal.classList.toggle('opacity-0');
        chatbotModal.classList.toggle('invisible');
        if (step === 0) {
            startConversation();
        }
    }

    function startConversation() {
        chatbotMessageContainer.innerHTML = ''; // Clear previous messages
        step = 0; // Reset the step counter
        userInfo = {}; // Clear user info

        setTimeout(() => {
            addMessage("Hello, welcome to Phedel! I am Powertronix available for your service.", false);
            setTimeout(() => {
                addMessage("Are you willing to provide your basic details?");
                addOptions(["Sure!", "No thank you."]);
                step++;
            }, 1000);
        }, 300);
    }

    chatbotLaunchBtn.addEventListener('click', toggleChatbot);
    chatbotCloseBtn.addEventListener('click', toggleChatbot);
    chatbotRestartBtn.addEventListener('click', startConversation);

    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `${isUser ? 'ml-auto bg-indigo-100' : 'mr-auto bg-gray-100'} rounded-lg p-2 max-w-[80%] animate-fadeIn`;
        messageDiv.textContent = content;
        chatbotMessageContainer.appendChild(messageDiv);
        chatbotMessageContainer.scrollTop = chatbotMessageContainer.scrollHeight;

        // Add a smooth transition
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(20px)';
        setTimeout(() => {
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
            messageDiv.style.transition = 'all 0.3s ease';
        }, 50);
    }

    function addOptions(options) {
        const optionsWrapper = document.createElement('div');
        optionsWrapper.className = "mr-auto bg-gray-100 rounded-lg p-2 max-w-[80%] animate-fadeIn";

        options.forEach(optionText => {
            const optionButton = document.createElement('button');
            optionButton.textContent = optionText;
            optionButton.className = "block bg-indigo-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-indigo-600 transition-colors duration-300";

            optionButton.addEventListener('click', () => handleOptionSelect(optionText));
            optionsWrapper.appendChild(optionButton);
        });

        chatbotMessageContainer.appendChild(optionsWrapper);
        chatbotMessageContainer.scrollTop = chatbotMessageContainer.scrollHeight;

        // Add a smooth transition
        optionsWrapper.style.opacity = '0';
        optionsWrapper.style.transform = 'translateY(20px)';
        setTimeout(() => {
            optionsWrapper.style.opacity = '1';
            optionsWrapper.style.transform = 'translateY(0)';
            optionsWrapper.style.transition = 'all 0.3s ease';
        }, 50);
    }

    function handleOptionSelect(option) {
        if (option === "Sure!") {
            step++;
            addMessage("Please provide your name:", false);
        } else if (option === "No thank you.") {
            addMessage("Thank you for choosing Phedel. Have a wonderful day!", false);
            step = 99; // End conversation
        }
    }

    function handleSend() {
        const message = chatbotInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatbotInput.value = '';
            handleStep(message);
        }
    }

    function handleStep(message) {
        if (step === 2) {
            userInfo.name = message;
            setTimeout(() => {
                addMessage("Please provide your phone number:", false);
                step++;
            }, 1000);
        } else if (step === 3) {
            if (validatePhoneNumber(message)) {
                userInfo.contactNumber = message;
                setTimeout(() => {
                    addMessage("Please provide your email:", false);
                    step++;
                }, 1000);
            } else {
                addMessage("Invalid phone number. Please enter a valid 10-digit number.", false);
            }
        } else if (step === 4) {
            if (validateEmail(message)) {
                userInfo.email = message;
                setTimeout(() => {
                    addMessage("What product can we help you with?", false);
                    addCheckboxOptions([ "HDPE PLB Duct Pipes", "Optical Fibre Accessories",
                            "Outdoor Telecom Products",
                            "CCTV Racks",
                            "Server Racks",
                            "Smart Racks",
                            "Other Services"]);
                    step++;
                }, 1000);
            } else {
                addMessage("Invalid email. Please enter a valid email address.", false);
            }
        }
    }

    function addCheckboxOptions(options) {
        const checkboxWrapper = document.createElement('div');
        checkboxWrapper.className = "mr-auto bg-gray-100 rounded-lg p-2 max-w-[80%] animate-fadeIn";

        options.forEach(optionText => {
            const checkboxLabel = document.createElement('label');
            checkboxLabel.className = "block mt-2";

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = optionText;
            checkbox.className = 'mr-2';

            checkboxLabel.appendChild(checkbox);
            checkboxLabel.appendChild(document.createTextNode(optionText));
            checkboxWrapper.appendChild(checkboxLabel);
        });

        const submitButton = document.createElement('button');
        submitButton.textContent = "Submit";
        submitButton.className = "block bg-indigo-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-indigo-600 transition-colors duration-300";
        checkboxWrapper.appendChild(submitButton);

        chatbotMessageContainer.appendChild(checkboxWrapper);
        chatbotMessageContainer.scrollTop = chatbotMessageContainer.scrollHeight;

        submitButton.addEventListener('click', () => {
            const selectedOptions = Array.from(checkboxWrapper.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);
            if (selectedOptions.length > 0) {
                userInfo.productHelp = selectedOptions;
                chatbotMessageContainer.removeChild(checkboxWrapper);
                addMessage(`Selected: ${selectedOptions.join(', ')}`, true);
                setTimeout(() => {
                    addMessage("Thank you so much, our customer representative will contact you soon.", false);
                    submitResponses(userInfo);
                    step = 99; // End conversation
                }, 1000);
            }
        });

        // Add a smooth transition
        checkboxWrapper.style.opacity = '0';
        checkboxWrapper.style.transform = 'translateY(20px)';
        setTimeout(() => {
            checkboxWrapper.style.opacity = '1';
            checkboxWrapper.style.transform = 'translateY(0)';
            checkboxWrapper.style.transition = 'all 0.3s ease';
        }, 50);
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePhoneNumber(phoneNumber) {
        const phoneRegex = /^\d{10}$/; // Adjust this regex based on the expected format
        return phoneRegex.test(phoneNumber);
    }

    chatbotSendBtn.addEventListener('click', handleSend);

    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });

    function submitResponses(userInfo) {
        fetch('/submit-chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userInfo.name,
                productHelp: userInfo.productHelp,
                email: userInfo.email,
                contactNumber: userInfo.contactNumber
            })
        }).then(response => response.json())
          .then(data => {
              console.log('Success:', data);
          }).catch((error) => {
              console.error('Error:', error);
          });
    }
})();

window.addEventListener('load', function() {
    const hoverMessage = document.getElementById('hover-message');
    setTimeout(() => {
        hoverMessage.classList.add('visible');
    }, 500); // Adjust the delay as necessary
});




});