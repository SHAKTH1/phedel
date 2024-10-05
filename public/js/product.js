

    const products = [
        {
            id: 1,
            title: 'Smart Rack',
            category: 'T-Shirt',
            image: 'product_image/smart_rack.png',
            description: 'A smart rack for data centers.',
            fullDescription: 'A Smart Rack is a cutting-edge technological device that improves the efficiency and usability of conventional data centre racks. An outline of a smart rack\'s features and advantages is provided below: Security, Remote Management, Cooling Systems, Asset Management, and Environmental Monitoring. Data centre technology has advanced in many different IT infrastructure contexts, their deployment can result in increased effectiveness, dependability, and cost savings.',
            benefits: ['Enhanced Productivity', 'Enhanced Dependability', 'Superior Asset Administration', 'Enhanced Security', 'Expandability', 'Cost Savings'],
            applications: ['Data Centers', 'Edge Computing', 'Telecommunications', 'Enterprise IT'],
            catalog: 'catalogs/smart_rack_catalog.pdf'
        },
        {
            id: 2,
            title: 'Server Rack',
            category: 'Short',
            image: 'product_image/server_rack.png',
            description: 'A server rack designed for optimal performance.',
            fullDescription: 'Designed to store and organise several servers and networking equipment, server racks are crucial parts of data centres and IT systems. An overview of server racks, including kinds, components, uses, and advantages, is provided here. The frame, rack units (U), mounting rails, doors, panels, cooling systems, power distribution, cable management, and security features are the components that make up a server rack.',
            benefits: ['Structure', 'Space Utilisation', 'Improved Airflow and Cooling', 'Enhanced Protection', 'Expandability'],
            applications: ['Data Centres', 'Enterprise IT', 'Telecommunications', 'Edge Computing', 'SMBs'],
            catalog: 'catalogs/server_rack_catalog.pdf'
        },
        {
            id: 3,
            title: 'Data Centre Rack',
            category: 'Pants',
            image: 'product_image/data-centre-rack.png',
            description: 'Organizes and houses crucial hardware for data centres.',
            fullDescription: 'The crucial hardware needed for networking, storage, and computing is housed and organized in Data Centre racks, an indispensable part of contemporary data centres. In order to facilitate effective management, cooling, and maintenance, they offer an organised environment for servers, storage devices, switches, and other infrastructure.',
            benefits: ['Organization', 'Cooling Efficiency', 'Scalability', 'Improved Cable Management', 'Enhanced Security'],
            applications: ['Mounting Rails', 'Cable Management', 'Cooling and Ventilation', 'Power Distribution Units (PDUs)', 'Security'],
            catalog: 'catalogs/data_centre_rack_catalog.pdf'
        },
        {
            id: 4,
            title: 'CCTV Racks',
            category: 'T-Shirt',
            image: 'product_image/cctv.png',
            description: 'Manages CCTV equipment in surveillance systems.',
            fullDescription: 'An indispensable element in the arrangement and administration of the diverse apparatuses employed in a closed-circuit television (CCTV) monitoring system is the CCTV rack. Here is a summary of its key attributes and parts: Organisational goal: Maintains clean, well-maintained CCTV equipment. Accessibility: Offers simple access to parts for upkeep and modifications.',
            benefits: ['Efficiency', 'Professional Look', 'Improved Performance'],
            applications: ['Open Frame Racks', 'Enclosed Racks', 'Wall-Mount Racks'],
            catalog: 'catalogs/cctv_rack_catalog.pdf'
        },
        {
            id: 5,
            title: 'Outdoor Telecom Products',
            category: 'Short',
            image: 'product_image/outdoor-telecom-products.png',
            description: 'Houses and protects equipment in outdoor environments.',
            fullDescription: 'Outdoor Telecom cabinets are crucial parts that house and safeguard various equipment in outdoor settings for usage in networking and telecommunications. Here is a summary of their main attributes, varieties, advantages, and things to think about: Sturdiness and Defence, Air Conditioning and Heating, Control of Power, Safety, Adaptability and Expandability, Handling Cables.',
            benefits: ['Safety and Dependability', 'Optimisation of Space', 'Expandability', 'Less Downtime'],
            applications: ['Cellular Networks', 'Broadband Networks', 'Public Safety', 'Utility and Transportation'],
            catalog: 'catalogs/outdoor_telecom_catalog.pdf'
        },
        {
            id: 6,
            title: 'Optical Fibre Accessories',
            category: 'Pants',
            image: 'product_image/optical-fibre.png',
            description: 'A variety of optical fibre cable accessories.',
            fullDescription: 'OFC accessories will be manufactured by PHEDEL ENTERPRISES INC. An assembly resembling an electrical cable but with one or more optical fibres used for light transmission within is called a fibre-optic cable, sometimes referred to as an optical fibre cable. We are manufacturing Joint Closures, Pig Tails, Patch Cords, Splitters, Patch panels, Splice trays, LIUs and FDMS Trays etc..',
            benefits: ['High Durability', 'Low Attenuation', 'Flexibility', 'Resistant to External Interference'],
            applications: ['Long-distance Communication', 'Data Centers', 'Telecommunications'],
            catalog: 'catalogs/optical_fibre_catalog.pdf'
        },
        {
            id: 7,
            title: 'HDPE PLB Duct Pipes',
            category: 'T-Shirt',
            image: 'product_image/HDPE_duct.png.jpg',
            description: 'Suitable for Optical Fibre Cable, Telecom Line, and Electrical Cable.',
            fullDescription: 'HDPE withstands a variety of climatic conditions and finds use in situations requiring low-cost, long-lasting fluid pipe systems. HDPE PLB Duct Pipes, Compression Fittings HDPE PLB Duct Pipe suitable for Optical fibre Cable (OFC), Telecom Line, Electrical Cable.',
            benefits: ['Environment Stress Crack Resistance', 'Impact Resistance', 'Crushing Resistance', 'Temperature Resistance'],
            applications: ['Optical Fibre Cable', 'Telecom Line', 'Electrical Cable'],
            catalog: 'catalogs/hdpe_duct_catalog.pdf'
        }
    ];

    const productsContainer = document.getElementById('products-grid');
    const searchInput = document.getElementById('searchProduct');
    const filterButtons = document.querySelectorAll('.filters button');

    const productModal = document.getElementById('product-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalFullDescription = document.getElementById('modal-full-description');
    const modalBenefits = document.getElementById('modal-benefits');
    const modalApplications = document.getElementById('modal-applications');
    const modalDownloadBtn = document.getElementById('modal-download-btn');
    const closeModal = document.getElementById('close-modal');

    // Function to display products
    function displayProducts(productsArray) {
        productsContainer.innerHTML = "";
        productsArray.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product', 'bg-white', 'p-4', 'rounded-lg', 'shadow', 'cursor-pointer');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="w-full h-40 object-cover rounded-md mb-4">
                <h4 class="text-xl font-bold">${product.title}</h4>
                <p class="text-gray-600">${product.description.substring(0, 50)}...</p>
            `;
            productElement.addEventListener('click', () => showProductDetails(product));
            productsContainer.appendChild(productElement);
        });
    }

    // Function to filter products
    function filterProducts(category) {
        let filteredProducts = products;
        if (category !== 'all') {
            filteredProducts = products.filter(product => product.category === category);
        }
        filteredProducts = searchProducts(filteredProducts);
        displayProducts(filteredProducts);
    }

    // Function to search products
    function searchProducts(productsArray) {
        const searchText = searchInput.value.toLowerCase();
        return productsArray.filter(product => product.title.toLowerCase().includes(searchText));
    }

    // Function to show product details in a modal
    function showProductDetails(product) {
        modalTitle.textContent = product.title;
        modalImage.src = product.image;
        modalDescription.textContent = product.description;
        modalFullDescription.textContent = product.fullDescription;
        modalBenefits.innerHTML = product.benefits.map(benefit => `<li>${benefit}</li>`).join('');
        modalApplications.innerHTML = product.applications.map(application => `<li>${application}</li>`).join('');
        modalDownloadBtn.href = product.catalog;
        modalDownloadBtn.setAttribute('download', product.title + ' Catalog');
        productModal.classList.remove('hidden');
    }

    // Event listener to close modal
    closeModal.addEventListener('click', () => {
        productModal.classList.add('hidden');
    });

    // Event listeners for filtering, searching, and sorting
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Add active class to clicked button and remove from others
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Call filterProducts with the selected category
            const category = button.dataset.category;
            filterProducts(category);
        });
    });

    searchInput.addEventListener('input', () => {
        filterProducts(document.querySelector('.filters button.active')?.dataset.category || 'all');
    });

    // Initial render of all products
    filterProducts('all');  // Moved to the end to avoid the "not defined" error
    (function () {
        const chatbotHTML = `
            <button id="chatbot-launch-btn" class="fixed bottom-5 right-5 bg-indigo-500 rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-indigo-600 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 10C18 15.523 13.523 20 8 20 6.345 20 4.735 19.679 3.253 19.075 2.691 18.835 1.998 18.898 1.585 19.256 1.356 19.444 0 20 0 20L2.28 17.721C1.09 16.545 0 14.856 0 13C0 7.477 4.477 3 10 3s10 4.477 10 10z" />
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
                                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('chatbot-component').innerHTML = chatbotHTML;
    
        // Chatbot elements
        const chatbotLaunchBtn = document.getElementById('chatbot-launch-btn');
        const chatbotModal = document.getElementById('chatbot-modal');
        const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
        const chatbotRestartBtn = document.getElementById('chatbot-restart-btn');
        const chatbotMessageContainer = document.getElementById('chatbot-message-container');
        const chatbotInput = document.getElementById('chatbot-input');
        const chatbotSendBtn = document.getElementById('chatbot-send-btn');
    
        // Chat state
        let chatStep = 0;
        let userDetails = {
            name: '',
            contactNumber: '',
            email: '',
            productHelp: []
        };
    
        // Append message to chat
        function appendMessage(sender, text, options = []) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('chat-message', sender === 'bot' ? 'bg-indigo-100' : 'bg-indigo-500', 'text-black', 'p-3', 'rounded-lg', 'mb-2', 'shadow-md');
            messageElement.style.maxWidth = '75%';
            messageElement.innerText = text;
            chatbotMessageContainer.appendChild(messageElement);
            
            // Smooth scroll to bottom
            chatbotMessageContainer.scrollTo({ top: chatbotMessageContainer.scrollHeight, behavior: 'smooth' });
    
            // Add response options as buttons if provided
            if (options.length > 0) {
                const optionsContainer = document.createElement('div');
                optionsContainer.classList.add('flex', 'space-x-2', 'mt-2');
                options.forEach(option => {
                    const optionBtn = document.createElement('button');
                    optionBtn.classList.add('bg-indigo-500', 'text-white', 'px-4', 'py-2', 'rounded-lg', 'hover:bg-indigo-600', 'transition-colors', 'duration-300');
                    optionBtn.innerText = option;
                    optionBtn.addEventListener('click', () => {
                        appendMessage('user', option);
                        handleChatResponse(option);
                    });
                    optionsContainer.appendChild(optionBtn);
                });
                chatbotMessageContainer.appendChild(optionsContainer);
            }
        }
    
        // Smooth show messages with delay
        function showMessageWithDelay(text, delay = 1000, options = []) {
            setTimeout(() => appendMessage('bot', text, options), delay);
        }
    
        // Handle chat response
        function handleChatResponse(response) {
            switch (chatStep) {
                case 0: // Initial greeting
                    if (response.toLowerCase() === 'sure') {
                        chatStep++;
                        showMessageWithDelay("May I know your name?", 1000);
                    } else {
                        endChat();
                    }
                    break;
                case 1: // User provides name
                    userDetails.name = response;
                    chatStep++;
                    showMessageWithDelay("Thank you! Can you please enter your phone number (10 digits)?", 1000);
                    break;
                case 2: // User provides phone number
                    if (/^\d{10}$/.test(response)) {
                        userDetails.contactNumber = response;
                        chatStep++;
                        showMessageWithDelay("Thank you! Can you please enter your email address?", 1000);
                    } else {
                        showMessageWithDelay("Please enter a valid 10-digit phone number.", 1000);
                    }
                    break;
                case 3: // User provides email
                    if (/^\S+@\S+\.\S+$/.test(response)) {
                        userDetails.email = response;
                        chatStep++;
                        showMessageWithDelay("Please enter the product name you require assistance with.", 1000);
                    } else {
                        showMessageWithDelay("Please enter a valid email address.", 1000);
                    }
                    break;
                case 4: // User provides product help
                    userDetails.productHelp.push(response);
                    chatStep++;
                    showMessageWithDelay("Thank you for your time. A ticket has been raised, and our customer representative will contact you soon. Have a nice day.", 1000);
                    sendEmail(); // Send the collected data to the server
                    showMessageWithDelay("Do you require assistance with any of our other products?", 2000, ['yes', 'no']);
                    break;
                case 5: // Asking for additional help
                    if (response.toLowerCase() === 'yes') {
                        chatStep = 4; // Loop back to the product assistance
                        showMessageWithDelay("Please enter the product name you require assistance with.", 1000);
                    } else {
                        endChat();
                    }
                    break;
            }
        }
    
        // End chat
        function endChat() {
            showMessageWithDelay("If you're facing any issues, feel free to contact us. Thank you, have a nice day!");
            chatStep = 0;
            userDetails = { name: '', contactNumber: '', email: '', productHelp: [] };
        }
    
        // Send email through server
        function sendEmail() {
            fetch('/submit-chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userDetails)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Email sent successfully:', data);
            })
            .catch(error => {
                console.error('Error sending email:', error);
            });
        }
    
        // Reload chat
        chatbotRestartBtn.addEventListener('click', () => {
            chatbotMessageContainer.innerHTML = '';
            startChat();
        });
    
        // Start the chat
        function startChat() {
            chatStep = 0;
            userDetails = { name: '', contactNumber: '', email: '', productHelp: [] };
            showMessageWithDelay("Hello, welcome to PHEDEL. I'm Powertronix, your chatbot assistant.", 500);
            showMessageWithDelay("Will you please provide your details?", 1500, ['sure', 'no thank you']);
        }
    
        // Initialize chat on launch
        chatbotLaunchBtn.addEventListener('click', () => {
            chatbotModal.classList.toggle('invisible');
            chatbotModal.classList.toggle('opacity-0');
            chatbotModal.classList.toggle('translate-y-full');
            startChat();
        });
    
        // Close chat
        chatbotCloseBtn.addEventListener('click', () => {
            chatbotModal.classList.add('invisible');
            chatbotModal.classList.add('opacity-0');
            chatbotModal.classList.add('translate-y-full');
        });
    
        // Handle sending chat messages
        chatbotSendBtn.addEventListener('click', () => {
            const userInput = chatbotInput.value.trim();
            if (userInput) {
                appendMessage('user', userInput);
                handleChatResponse(userInput);
                chatbotInput.value = '';
            }
        });
    })();
    
    // Function to display products with animation
function displayProducts(productsArray) {
    productsContainer.innerHTML = ""; // Clear the container

    productsArray.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.classList.add('product', 'bg-white', 'p-4', 'rounded-lg', 'shadow', 'cursor-pointer');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="w-full h-40 object-cover rounded-md mb-4">
            <h4 class="text-xl font-bold">${product.title}</h4>
            <p class="text-gray-600">${product.description.substring(0, 50)}...</p>
        `;
        productElement.addEventListener('click', () => showProductDetails(product));
        productsContainer.appendChild(productElement);

        // Delay adding the 'show' class to create a staggered animation effect
        setTimeout(() => {
            productElement.classList.add('show'); // Add 'show' class to trigger the CSS animation
        }, index * 100); // Stagger animation for each product
    });
}

// Function to filter products
function filterProducts(category) {
    let filteredProducts = products;

    if (category !== 'all') {
        filteredProducts = products.filter(product => product.category === category);
    }

    filteredProducts = searchProducts(filteredProducts);

    // Add a slight delay to allow smooth transition
    productsContainer.innerHTML = ''; // Clear products before the transition
    setTimeout(() => {
        displayProducts(filteredProducts);
    }, 200);
}
    

