document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.getElementById('page-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('bg-[#151515]/95', 'backdrop-blur-md', 'border-[#2a2a2a]', 'py-2', 'shadow-lg');
                header.classList.remove('bg-transparent', 'py-6');
            } else {
                header.classList.remove('bg-[#151515]/95', 'backdrop-blur-md', 'border-[#2a2a2a]', 'py-2', 'shadow-lg');
                header.classList.add('bg-transparent', 'py-6');
            }
        });
    }

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const openIcon = document.getElementById('mobile-menu-open-icon');
    const closeIcon = document.getElementById('mobile-menu-close-icon');

    if (mobileMenuButton && mobileMenu && openIcon && closeIcon) {
        mobileMenuButton.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('max-h-64');
            mobileMenu.classList.toggle('opacity-100');
            mobileMenu.classList.toggle('max-h-0');
            mobileMenu.classList.toggle('opacity-0');
            
            openIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        });
    }

    // Smooth scroll for nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            const element = document.querySelector(href);
            if (element) {
                const headerOffset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('max-h-64')) {
                    mobileMenu.classList.remove('max-h-64', 'opacity-100');
                    mobileMenu.classList.add('max-h-0', 'opacity-0');
                    openIcon.classList.remove('hidden');
                    closeIcon.classList.add('hidden');
                }
            }
        });
    });

    // Commandments Modal Logic
    const modal = document.getElementById('commandment-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalOverlay = document.querySelector('.modal-overlay');

    const commandments = {
        'commandment-1': {
            title: 'А на ком ты хочешь поиграть?',
            description: 'Зачастую поиск занимает довольно много времени и именно ТЫ можешь за это время придумать себе парочку героев, что бы не ловить панику за 5 секунд до конца таймера. И даже оговорить это с кентами, так вы повысите шансы на победу.'
        },
        'commandment-2': {
            title: 'Говори больше.',
            description: 'Это не зачит, что нужно обсуждать во время игры Наташу с второго подъезда, которую вчера по кругу пусили Если хочешь что-то сделать - предложи Если ты с чем-то не согласен - скажи На тебя напали и пытаются убить -ОРИ КАК СУКА, что бы твоим ТИММЕЙТЫ точно тебя услышали.'
        },
        'commandment-3': {
            title: 'Сказано - сделано.',
            description: 'Если вам предложили гангануть/нажать смок/ подождать кд кнопок это значит, что вы идете гангать/нажимаете смок/ждете кд кнопок. Если не согласны - говорите сразу. Надо дофармить шмоту - скажите. Если вы этого не сказали заранее, значит идете и делаете то, что сказано.'
        }
    };

    const openModal = (id) => {
        const data = commandments[id];
        if (data && modal) {
            modalTitle.textContent = data.title;
            modalDescription.textContent = data.description;
            modal.classList.remove('modal-hidden');
        }
    };

    const closeModal = () => {
        if (modal) {
            modal.classList.add('modal-hidden');
        }
    };

    document.getElementById('commandment-1').addEventListener('click', () => openModal('commandment-1'));
    document.getElementById('commandment-2').addEventListener('click', () => openModal('commandment-2'));
    document.getElementById('commandment-3').addEventListener('click', () => openModal('commandment-3'));

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Player Modal Logic
    const playerModal = document.getElementById('player-modal');
    const playerModalImg = document.getElementById('player-modal-img');
    const playerModalName = document.getElementById('player-modal-name');
    const playerModalRole = document.getElementById('player-modal-role');
    const playerModalDescription = document.getElementById('player-modal-description');
    const playerModalOverlay = playerModal.querySelector('.modal-overlay');

    const playerCards = document.querySelectorAll('.player-card');

    const openPlayerModal = (card) => {
        const imgSrc = card.querySelector('img').src;
        const name = card.querySelector('.player-name').textContent;
        const role = card.querySelector('.player-role').textContent;
        const description = card.querySelector('.player-description').textContent;

        playerModalImg.src = imgSrc;
        playerModalName.textContent = name;
        playerModalRole.textContent = role;
        playerModalDescription.textContent = description;

        playerModal.classList.remove('modal-hidden');
    };

    const closePlayerModal = () => {
        playerModal.classList.add('modal-hidden');
    };

    playerCards.forEach(card => {
        card.addEventListener('click', () => openPlayerModal(card));
    });

    if (playerModalOverlay) {
        playerModalOverlay.addEventListener('click', closePlayerModal);
    }
});