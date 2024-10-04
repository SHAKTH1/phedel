document.addEventListener('DOMContentLoaded', () => {
    // Existing code...

  
    // Product Cards and Modal Code
    const products = [
        {
            id: 1,
            title: 'Smart Rack',
            image: 'product_image/smart_rack.png',
            description: 'A smart rack for data centers.',
            fullDescription: 'This smart rack offers enhanced security, remote management, cooling systems, asset management, and environmental monitoring.',
            benefits: ['Enhanced Productivity', 'Superior Asset Administration', 'Enhanced Security', 'Expandability', 'Cost Savings'],
            applications: ['Data Centers', 'Edge Computing', 'Telecommunications', 'Enterprise IT'],
            catalog: 'catalogs/smart_rack_catalog.pdf'
        },
        {
            id: 2,
            title: 'Server Rack',
            image: 'product_image/server_rack.png',
            description: 'A server rack designed for optimal performance.',
            fullDescription: 'Modern IT infrastructure cannot function without server racks, which offer an organised and effective means of housing and controlling networking hardware and servers.',
            benefits: ['Structure', 'Space Utilisation', 'Improved Airflow and Cooling', 'Enhanced Protection', 'Expandability'],
            applications: ['Data Centres', 'Enterprise IT', 'Telecommunications', 'Edge Computing', 'SMBs'],
            catalog: 'catalogs/server_rack_catalog.pdf'
        },
        {
            id: 3,
            title: 'Data Centre Rack',
            image: 'product_image/data-centre-rack.png',
            description: 'Organizes and houses crucial hardware for data centres.',
            fullDescription: 'Data centre racks provide organisation, cooling, power distribution, and security.',
            benefits: ['Organization', 'Cooling Efficiency', 'Scalability', 'Improved Cable Management', 'Enhanced Security'],
            applications: ['Mounting Rails', 'Cable Management', 'Cooling and Ventilation', 'Power Distribution Units (PDUs)', 'Security'],
            catalog: 'catalogs/data_centre_rack_catalog.pdf'
        },
        {
            id: 4,
            title: 'CCTV Racks',
            image: 'product_image/cctv.png',
            description: 'Manages CCTV equipment in surveillance systems.',
            fullDescription: 'The structural framework maintains clean, well-maintained CCTV equipment, offering security and easy accessibility.',
            benefits: ['Efficiency', 'Professional Look', 'Improved Performance'],
            applications: ['Open Frame Racks', 'Enclosed Racks', 'Wall-Mount Racks'],
            catalog: 'catalogs/cctv_rack_catalog.pdf'
        },
        {
            id: 5,
            title: 'Outdoor Telecom Products',
            image: 'product_image/outdoor-telecom-products.png',
            description: 'Houses and protects equipment in outdoor environments.',
            fullDescription: 'Outdoor Telecom cabinets are crucial parts that house and safeguard various equipment in outdoor settings.',
            benefits: ['Safety and Dependability', 'Optimisation of Space', 'Expandability', 'Less Downtime'],
            applications: ['Cellular Networks', 'Broadband Networks', 'Public Safety', 'Utility and Transportation'],
            catalog: 'catalogs/outdoor_telecom_catalog.pdf'
        },
        {
            id: 6,
            title: 'Optical Fibre Accessories',
            image: 'product_image/optical-fibre.png',
            description: 'A variety of optical fibre cable accessories.',
            fullDescription: 'We manufacture joint closures, pig tails, patch cords, splitters, patch panels, splice trays, LIUs, and FDMS trays.',
            benefits: ['High Durability', 'Low Attenuation', 'Flexibility', 'Resistant to External Interference'],
            applications: ['Long-distance Communication', 'Data Centers', 'Telecommunications'],
            catalog: 'catalogs/optical_fibre_catalog.pdf'
        },
        {
            id: 7,
            title: 'HDPE PLB Duct Pipes',
            image: 'product_image/HDPE_duct.png.jpg',
            description: 'Suitable for Optical Fibre Cable, Telecom Line, and Electrical Cable.',
            fullDescription: 'HDPE PLB Duct Pipes are known for their stress crack resistance, impact resistance, and temperature resistance.',
            benefits: ['Environment Stress Crack Resistance', 'Impact Resistance', 'Crushing Resistance', 'Temperature Resistance'],
            applications: ['Optical Fibre Cable', 'Telecom Line', 'Electrical Cable'],
            catalog: 'catalogs/hdpe_duct_catalog.pdf'
        }
    ];

    const productsGrid = document.getElementById('products-grid');
    const productModal = document.getElementById('product-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalFullDescription = document.getElementById('modal-full-description');
    const modalBenefits = document.getElementById('modal-benefits');
    const modalApplications = document.getElementById('modal-applications');
    const modalDownloadBtn = document.getElementById('modal-download-btn');
    const closeModal = document.getElementById('close-modal');

    function renderProductCards() {
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow', 'cursor-pointer');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="w-full h-40 object-cover rounded-md mb-4">
                <h4 class="text-xl font-bold">${product.title}</h4>
                <p class="text-gray-600">${product.description.substring(0, 50)}...</p>
            `;
            productCard.addEventListener('click', () => showProductDetails(product));
            productsGrid.appendChild(productCard);
        });
    }

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

    closeModal.addEventListener('click', () => {
        productModal.classList.add('hidden');
    });

    renderProductCards();
});
