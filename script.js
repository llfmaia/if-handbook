
        const chatMessages = document.getElementById('chatMessages');
        const questionSelect = document.getElementById('questionSelect');
        const sendButton = document.getElementById('sendButton');
        
        
        const answers = {
            testRepose: "To request a test repose, you need to submit a formal request to your professor within 48 hours of the original test date. Provide a valid reason and any supporting documentation if available.",
            library: "You can access the library using your student ID card. The library is open Monday to Friday from 8 AM to 8 PM, and on Saturdays from 9 AM to 1 PM.",
            schedule: "Your class schedule can be found on the IFMG student portal. Log in with your credentials, navigate to 'Academic Information', and select 'Class Schedule'.",
            advisorMeeting: "To schedule a meeting with your advisor, use the online appointment system on the IFMG website. Go to 'Student Services', then 'Advising', and follow the prompts to book an available time slot.",
        };

        sendButton.addEventListener('click', () => {
            const selectedQuestion = questionSelect.value;
            if (selectedQuestion) {
                const userMessage = questionSelect.options[questionSelect.selectedIndex].text;
                addMessage(userMessage, 'user-message');
                
                setTimeout(() => {
                    const botResponse = answers[selectedQuestion];
                    addMessage(botResponse, 'bot-message');
                }, 500);

                questionSelect.value = "";
            }
        });

        function addMessage(text, className) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', className);
            
            
            
            const contentDiv = document.createElement('div');
            
            const messageContent = document.createElement('div');
            messageContent.classList.add('message-content');
            messageContent.textContent = text;
            
            const timeDiv = document.createElement('div');
            timeDiv.classList.add('time');
            timeDiv.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            contentDiv.appendChild(messageContent);
            contentDiv.appendChild(timeDiv);
            
            if (className === 'user-message') {
                messageDiv.appendChild(contentDiv);

            } else {

                messageDiv.appendChild(contentDiv);
            }
            
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        const body = document.body;
        
        function setDarkMode(isDark) {
            if (isDark) {
                body.classList.add('dark-mode');
            } else {
                body.classList.remove('dark-mode');
            }
            // Toggle logo visibility
            toggleLogos(isDark);
        }
        
        function toggleLogos(isDark) {
            const logoLight = document.querySelector('.logo-light');
            const logoDark = document.querySelector('.logo-dark');
            if (isDark) {
                logoLight.style.display = 'none';
                logoDark.style.display = 'block';
            } else {
                logoLight.style.display = 'block';
                logoDark.style.display = 'none';
            }
        }
        
        // Initial check for system preference
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
        setDarkMode(prefersDarkScheme.matches);
        
        // Listen for changes in system preference
        prefersDarkScheme.addEventListener('change', event => {
            setDarkMode(event.matches);
        });
    
        