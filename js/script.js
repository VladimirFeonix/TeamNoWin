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

    // Video Gallery Logic
    const mainVideoSlot = document.getElementById('main-video-slot');
    const sideVideoList = document.getElementById('side-video-list');

    if (mainVideoSlot && sideVideoList) {
        sideVideoList.addEventListener('click', (e) => {
            // If the play button was clicked, don't swap. Let the other listener handle it.
            if (e.target.closest('.video-play-button')) {
                return;
            }
            const clickedItem = e.target.closest('.video-item');
            if (!clickedItem) return;

            const mainItem = mainVideoSlot.querySelector('[data-video-id]');
            if (!mainItem) return;

            // Prevent swapping with itself
            if (mainItem.dataset.videoId === clickedItem.dataset.videoId) return;

            // Store data from both items in temporary variables
            const mainTitle = mainItem.dataset.title;
            const mainYoutubeId = mainItem.dataset.youtubeId;
            const mainBgImage = mainItem.dataset.bgImage;
            const mainIsNew = mainItem.dataset.isNew;
            const mainVideoId = mainItem.dataset.videoId;
            const mainViews = mainItem.dataset.views;

            const sideTitle = clickedItem.dataset.title;
            const sideYoutubeId = clickedItem.dataset.youtubeId;
            const sideBgImage = clickedItem.dataset.bgImage;
            const sideIsNew = clickedItem.dataset.isNew;
            const sideVideoId = clickedItem.dataset.videoId;
            const sideViews = clickedItem.dataset.views;

            // --- Update Main Slot using Side Data ---
            mainItem.dataset.videoId = sideVideoId;
            mainItem.dataset.title = sideTitle;
            mainItem.dataset.youtubeId = sideYoutubeId;
            mainItem.dataset.bgImage = sideBgImage;
            mainItem.dataset.isNew = sideIsNew;
            mainItem.dataset.views = sideViews;

            mainVideoSlot.querySelector('#main-video-bg').style.backgroundImage = `url('${sideBgImage}')`;
            mainVideoSlot.querySelector('#main-video-title').textContent = sideTitle;
            mainVideoSlot.querySelector('#main-video-link').dataset.youtubeId = sideYoutubeId;
            mainVideoSlot.querySelector('#main-video-badge').style.display = (sideIsNew === 'true') ? 'block' : 'none';

            // --- Update Side Item using Main Data ---
            clickedItem.dataset.videoId = mainVideoId;
            clickedItem.dataset.title = mainTitle;
            clickedItem.dataset.youtubeId = mainYoutubeId;
            clickedItem.dataset.bgImage = mainBgImage;
            clickedItem.dataset.isNew = mainIsNew;
            clickedItem.dataset.views = mainViews;

            clickedItem.querySelector('.video-item-title').textContent = mainTitle;
            clickedItem.querySelector('.video-play-button').dataset.youtubeId = mainYoutubeId;
        });
    }

    // Video Player Modal Logic
    const videoModal = document.getElementById('video-player-modal');
    if(videoModal) {
        const videoIframe = document.getElementById('youtube-iframe');
        const closeVideoModalButton = document.getElementById('close-video-modal');
        const videoModalOverlay = videoModal.querySelector('.modal-overlay');

        const openVideoModal = (youtubeId) => {
            if (videoIframe) {
                videoIframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
                videoModal.classList.remove('modal-hidden');
            }
        };

        const closeVideoModal = () => {
            if (videoIframe) {
                videoModal.classList.add('modal-hidden');
                // Stop video playback by clearing the src
                videoIframe.src = '';
            }
        };

        // Add listeners to all video play triggers
        document.addEventListener('click', (e) => {
            const playButton = e.target.closest('.video-play-button');
            if (playButton) {
                e.preventDefault();
                // Check if the click is for swapping or playing
                const parentVideoItem = playButton.closest('.video-item');
                // If it's a side video, let the swap logic handle it, don't open modal.
                // The main video play button is not inside a '.video-item'.
                if (parentVideoItem && sideVideoList.contains(parentVideoItem)) {
                    // This is a click on a play icon within the side list.
                    // We let the swap logic above handle this. We can also choose to play it directly.
                    // For now, let's assume any play button click should open the modal.
                }

                const youtubeId = playButton.dataset.youtubeId;
                if (youtubeId) {
                    openVideoModal(youtubeId);
                }
            }
        });

        // Listener for closing the modal
        if (closeVideoModalButton) {
            closeVideoModalButton.addEventListener('click', closeVideoModal);
        }
        if (videoModalOverlay) {
            videoModalOverlay.addEventListener('click', closeVideoModal);
        }
    }
});