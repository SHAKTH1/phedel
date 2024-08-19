

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
                <button id="chatbot-close-btn" class="text-white hover:text-gray-200 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
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
            setTimeout(() => {
                addMessage("Hi, welcome to Phedel! I am a virtual bot available for your service.", false);
                setTimeout(() => {
                    addMessage("What is your name?");
                    step++;
                }, 1000);
            }, 300);
        }
    }

    chatbotLaunchBtn.addEventListener('click', toggleChatbot);
    chatbotCloseBtn.addEventListener('click', toggleChatbot);

    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `${isUser ? 'ml-auto bg-indigo-100' : 'mr-auto bg-gray-100'} rounded-lg p-2 max-w-[80%] animate-fadeIn`;
        messageDiv.textContent = content;
        chatbotMessageContainer.appendChild(messageDiv);
        chatbotMessageContainer.scrollTop = chatbotMessageContainer.scrollHeight;
    }

    function addCheckboxes(options) {
        const checkboxWrapper = document.createElement('div');
        checkboxWrapper.className = "mr-auto bg-gray-100 rounded-lg p-2 max-w-[80%] animate-fadeIn";

        const instructionText = document.createElement('p');
        instructionText.textContent = "Select one or more options:";
        checkboxWrapper.appendChild(instructionText);

        options.forEach(optionText => {
            const label = document.createElement('label');
            label.className = "block mt-2";

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = optionText;
            checkbox.className = "mr-2";

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(optionText));
            checkboxWrapper.appendChild(label);
        });

        chatbotMessageContainer.appendChild(checkboxWrapper);
        chatbotMessageContainer.scrollTop = chatbotMessageContainer.scrollHeight;

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';
        submitButton.className = "bg-indigo-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-indigo-600 transition-colors duration-300";
        checkboxWrapper.appendChild(submitButton);

        submitButton.addEventListener('click', () => {
            const selectedOptions = Array.from(checkboxWrapper.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);
            if (selectedOptions.length > 0) {
                userInfo.productHelp = selectedOptions;
                chatbotMessageContainer.removeChild(checkboxWrapper);
                addMessage(`Selected: ${selectedOptions.join(', ')}`, true);
                setTimeout(() => {
                    addMessage("Please provide your email:");
                    step++;
                }, 1000);
            }
        });
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
        if (step === 1) {
            userInfo.name = message;
            setTimeout(() => {
                addMessage("What product help do you require? (You can select multiple options)");
                addCheckboxes([
                    "HDPE PLB Duct Pipes",
                    "Optical Fibre Accessories",
                    "Outdoor Telecom Products",
                    "CCTV Racks",
                    "Server Racks",
                    "Smart Racks",
                    "Other Services"
                ]);
                step++;
            }, 1000);
        } else if (step === 3) {
            if (validateEmail(message)) {
                userInfo.email = message;
                setTimeout(() => {
                    addMessage("Please provide your contact number:");
                    step++;
                }, 1000);
            } else {
                addMessage("Please enter a valid email address.");
            }
        } else if (step === 4) {
            if (validatePhoneNumber(message)) {
                userInfo.contactNumber = message;
                setTimeout(() => {
                    addMessage(`Thank you, ${userInfo.name}. Our customer service team will soon contact you.`);
                    console.log("User Info:", userInfo);
                    submitResponses(userInfo);  // <-- Call the function here
                    step++;
                }, 1000);
            } else {
                addMessage("Please enter a valid contact number.");
            }
        }
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
                name: userInfo.name,            // Use userInfo object
                productHelp: userInfo.productHelp,  // Use userInfo object
                email: userInfo.email,          // Use userInfo object
                contactNumber: userInfo.contactNumber // Use userInfo object
            })
        }).then(response => response.json())
          .then(data => {
              console.log('Success:', data);
          }).catch((error) => {
              console.error('Error:', error);
          });
    }
    
})();
});
