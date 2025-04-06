document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
  
    // Initial welcome message from AllyBot
    setTimeout(() => {
      addBotMessage("👋 Hi there! I'm AllyBot, your learning assistant for 10th grade topics. Ask me any question about Science, Math, History, or other subjects!");
    }, 500);
  
    // Handle form submission
    chatForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const message = chatInput.value.trim();
      if (message === '') return;
      
      // Add user message to chat
      addUserMessage(message);
      
      // Clear input
      chatInput.value = '';
      
      // Process message and get bot response
      processMessage(message);
    });
  
    // Add user message to chat
    function addUserMessage(message) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message', 'user-message');
      messageElement.innerHTML = `
        <div>${message}</div>
        <div class="message-time">${getCurrentTime()}</div>
      `;
      chatMessages.appendChild(messageElement);
      scrollToBottom();
    }
  
    // Add bot message to chat
    function addBotMessage(message) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message', 'bot-message');
      
      // Show typing indicator
      messageElement.innerHTML = '<div class="typing-indicator">AllyBot is typing<span>.</span><span>.</span><span>.</span></div>';
      chatMessages.appendChild(messageElement);
      scrollToBottom();
      
      // Simulate typing delay (longer for complex answers)
      const typingDelay = message.length > 300 ? 2000 : 1000;
      
      setTimeout(() => {
        messageElement.innerHTML = `
          <div>${message}</div>
          <div class="message-time">${getCurrentTime()}</div>
        `;
        scrollToBottom();
      }, typingDelay);
    }
  
    // Process user message and generate response
    function processMessage(message) {
      const lowercaseMessage = message.toLowerCase();
      
      // Basic greetings and conversation
      if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi') || lowercaseMessage.includes('hey')) {
        addBotMessage("Hello! I'm here to help with your 10th grade studies. What subject would you like to discuss today?");
        return;
      } 
      if (lowercaseMessage.includes('thank')) {
        addBotMessage("You're welcome! Feel free to ask if you have any other questions. I'm here to help with your studies.");
        return;
      }
      if (lowercaseMessage.includes('bye') || lowercaseMessage.includes('goodbye')) {
        addBotMessage("Goodbye! Good luck with your studies. Come back anytime you need learning assistance!");
        return;
      }
  
      // Study planning and organization
      if (lowercaseMessage.includes('study plan') || lowercaseMessage.includes('how to study') || lowercaseMessage.includes('study tips')) {
        addBotMessage("Here are some effective study tips for 10th grade students:<br><br>1. Create a consistent study schedule with breaks<br>2. Use active learning techniques like teaching concepts to someone else<br>3. Practice with past exam papers<br>4. Use mind maps for complex topics<br>5. Form study groups for difficult subjects<br>6. Get enough sleep before exams<br><br>Would you like specific tips for any subject?");
        return;
      }
  
      // Subject specific responses - BIOLOGY
      if ((lowercaseMessage.includes('digestion') || lowercaseMessage.includes('digestive system')) && lowercaseMessage.includes('human')) {
        addBotMessage("👨‍🔬 <b>Human Digestion Process:</b><br><br>The digestive system breaks down food into nutrients through these steps:<br><br>1. <b>Ingestion</b>: Food enters through the mouth.<br><br>2. <b>Mouth</b>: Food is chewed and mixed with saliva containing amylase which begins breaking down carbohydrates.<br><br>3. <b>Esophagus</b>: Food travels down via peristalsis (wave-like muscle contractions).<br><br>4. <b>Stomach</b>: Food mixes with gastric juices containing HCl and pepsin, forming chyme. Protein digestion begins here.<br><br>5. <b>Small Intestine</b>: Most digestion occurs here. Bile from the liver emulsifies fats. Pancreatic enzymes and intestinal enzymes break down proteins, fats, and carbohydrates into absorbable molecules.<br><br>6. <b>Absorption</b>: Nutrients are absorbed through villi and microvilli into bloodstream.<br><br>7. <b>Large Intestine</b>: Water absorption occurs, forming feces.<br><br>8. <b>Elimination</b>: Waste exits through the rectum and anus.<br><br>Would you like more details about any specific part of this process?");
        return;
      }
      
      if (lowercaseMessage.includes('photosynthesis')) {
        addBotMessage("🌱 <b>Photosynthesis</b> is the process by which green plants make their own food.<br><br><b>Equation</b>: 6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂<br><br><b>Steps</b>:<br>1. <b>Light Dependent Reactions</b>: Occur in thylakoids, convert light energy to chemical energy (ATP and NADPH)<br>2. <b>Calvin Cycle</b>: Uses ATP and NADPH to convert CO₂ into glucose<br><br><b>Factors affecting photosynthesis</b>:<br>- Light intensity<br>- CO₂ concentration<br>- Temperature<br>- Water availability<br><br>Plants use the glucose produced for growth, respiration, and storage as starch.");
        return;
      }
      
      if (lowercaseMessage.includes('cell') && (lowercaseMessage.includes('structure') || lowercaseMessage.includes('organelle'))) {
        addBotMessage("🔬 <b>Cell Structure</b><br><br><b>Cell Membrane</b>: Selectively permeable barrier controlling what enters/exits the cell<br><br><b>Nucleus</b>: Contains DNA and controls cell activities<br><br><b>Cytoplasm</b>: Jelly-like substance where chemical reactions occur<br><br><b>Mitochondria</b>: 'Powerhouse' producing energy (ATP) through cellular respiration<br><br><b>Endoplasmic Reticulum</b>: Transport network; rough ER has ribosomes for protein synthesis<br><br><b>Golgi Apparatus</b>: Modifies, packages and distributes proteins<br><br><b>Lysosomes</b>: Contain digestive enzymes for breaking down waste<br><br><b>Chloroplasts</b>: In plant cells only, site of photosynthesis<br><br><b>Cell Wall</b>: In plant cells only, provides rigid structure");
        return;
      }
      
      if (lowercaseMessage.includes('mendel') || (lowercaseMessage.includes('genetic') && lowercaseMessage.includes('law'))) {
        addBotMessage("🧬 <b>Mendel's Laws of Inheritance</b><br><br>1. <b>Law of Dominance</b>: In a heterozygous organism, only the dominant allele will be expressed while the recessive allele remains hidden.<br><br>2. <b>Law of Segregation</b>: During gamete formation, the two alleles for each trait separate (segregate) so each gamete carries only one allele for each gene.<br><br>3. <b>Law of Independent Assortment</b>: Genes for different traits are inherited independently of each other, allowing for genetic variation.<br><br>Mendel discovered these principles through experiments with pea plants, tracking traits like seed shape, flower color, and plant height.");
        return;
      }
  
      // CHEMISTRY
      if (lowercaseMessage.includes('periodic table') || lowercaseMessage.includes('elements') || lowercaseMessage.includes('periodic law')) {
        addBotMessage("⚗️ <b>Modern Periodic Table</b><br><br>The periodic table organizes elements by increasing atomic number and similar chemical properties.<br><br><b>Key Features</b>:<br>- <b>Groups</b> (columns): Elements with similar properties<br>- <b>Periods</b> (rows): Elements with same number of electron shells<br>- <b>Metals</b>: Left side, conduct heat/electricity<br>- <b>Non-metals</b>: Right side (except noble gases)<br>- <b>Metalloids</b>: Along the stair-step line<br>- <b>Noble Gases</b>: Group 18, very stable<br>- <b>Alkali Metals</b>: Group 1, very reactive<br>- <b>Halogens</b>: Group 17, very reactive non-metals<br><br>Properties like atomic radius, ionization energy, and electronegativity follow periodic trends across the table.");
        return;
      }
      
      if (lowercaseMessage.includes('chemical bond') || lowercaseMessage.includes('ionic bond') || lowercaseMessage.includes('covalent bond')) {
        addBotMessage("🔗 <b>Chemical Bonding</b><br><br>1. <b>Ionic Bonding</b>: Electron transfer between metals and non-metals<br>- Forms between elements with large electronegativity differences<br>- Creates charged ions (cations and anions) held by electrostatic forces<br>- Example: NaCl (table salt)<br><br>2. <b>Covalent Bonding</b>: Electron sharing between non-metals<br>- Can be single, double, or triple bonds<br>- Polar if electrons are unequally shared<br>- Non-polar if electrons are equally shared<br>- Example: H₂O (water), CO₂ (carbon dioxide)<br><br>3. <b>Metallic Bonding</b>: In metals, where electrons move freely<br>- Creates 'sea of electrons' around positive metal ions<br>- Explains properties like conductivity and malleability<br>- Example: copper, iron, aluminum");
        return;
      }
      
      if ((lowercaseMessage.includes('acid') && lowercaseMessage.includes('base')) || lowercaseMessage.includes('ph scale')) {
        addBotMessage("🧪 <b>Acids, Bases, and pH</b><br><br><b>Acids</b>:<br>- pH less than 7<br>- Sour taste<br>- Turn blue litmus red<br>- React with metals to produce hydrogen gas<br>- Examples: HCl, H₂SO₄, citric acid<br><br><b>Bases</b>:<br>- pH greater than 7<br>- Bitter taste, slippery feel<br>- Turn red litmus blue<br>- React with acids to form salt and water (neutralization)<br>- Examples: NaOH, KOH, soap<br><br><b>pH Scale</b>:<br>- Ranges from 0 (strongly acidic) to 14 (strongly basic)<br>- pH 7 is neutral (pure water)<br>- Each unit represents a 10-fold change in H⁺ concentration<br><br><b>Indicators</b>: Substances that change color at specific pH values (e.g., phenolphthalein, methyl orange)");
        return;
      }
  
      // PHYSICS
      if ((lowercaseMessage.includes('newton') && lowercaseMessage.includes('law')) || lowercaseMessage.includes('laws of motion')) {
        addBotMessage("🚀 <b>Newton's Laws of Motion</b><br><br>1. <b>First Law (Law of Inertia)</b>: An object will remain at rest or in uniform motion in a straight line unless acted upon by an external force.<br>- Example: Objects sliding when a bus stops suddenly<br><br>2. <b>Second Law</b>: Force equals mass times acceleration (F = ma).<br>- Explains why it's harder to push a heavy object than a light one<br>- SI unit of force: Newton (N)<br><br>3. <b>Third Law</b>: For every action, there is an equal and opposite reaction.<br>- Example: Rocket propulsion - gases pushed out backward propel the rocket forward<br>- Example: Walking - you push the ground backward, ground pushes you forward<br><br>These laws form the foundation of classical mechanics and explain the motion of objects in our everyday world.");
        return;
      }
      
      if (lowercaseMessage.includes('electricity') || lowercaseMessage.includes('ohm') || lowercaseMessage.includes('circuit')) {
        addBotMessage("⚡ <b>Basic Electricity</b><br><br><b>Key Concepts</b>:<br>- <b>Current (I)</b>: Flow of electric charge (measured in Amperes)<br>- <b>Voltage (V)</b>: Electric potential difference (measured in Volts)<br>- <b>Resistance (R)</b>: Opposition to current flow (measured in Ohms)<br><br><b>Ohm's Law</b>: V = IR<br><br><b>Types of Circuits</b>:<br>1. <b>Series Circuit</b>: Components connected end-to-end<br>   - Same current throughout<br>   - Voltages add up<br>   - Total resistance = sum of individual resistances<br><br>2. <b>Parallel Circuit</b>: Components connected across each other<br>   - Same voltage across components<br>   - Currents add up<br>   - Total resistance is less than the smallest individual resistance<br><br><b>Power</b>: P = VI (measured in Watts)");
        return;
      }
  
      // MATHEMATICS
      if (lowercaseMessage.includes('quadratic') || (lowercaseMessage.includes('equation') && lowercaseMessage.includes('solve'))) {
        addBotMessage("📊 <b>Solving Quadratic Equations</b><br><br>A quadratic equation has the form: ax² + bx + c = 0<br><br><b>Methods to solve</b>:<br><br>1. <b>Factoring</b>:<br>   - Write as product of two binomials: (px + q)(rx + s) = 0<br>   - Set each factor equal to zero and solve<br><br>2. <b>Quadratic Formula</b>:<br>   x = [-b ± √(b² - 4ac)]/2a<br><br>3. <b>Completing the Square</b>:<br>   - Rearrange to form a perfect square trinomial<br>   - Example: x² + 6x + 8 = 0 → (x + 3)² = 1 → x + 3 = ±1 → x = -3±1<br><br>4. <b>Graphical Method</b>:<br>   - Plot y = ax² + bx + c<br>   - x-intercepts are the solutions<br><br>The <b>discriminant</b> (b² - 4ac) tells you the nature of the roots:<br>- If > 0: two real roots<br>- If = 0: one real root (repeated)<br>- If < 0: two complex conjugate roots");
        return;
      }
      
      if (lowercaseMessage.includes('triangle') && lowercaseMessage.includes('similar')) {
        addBotMessage("📐 <b>Similar Triangles</b><br><br><b>Definition</b>: Two triangles are similar if their corresponding angles are equal and their corresponding sides are in proportion.<br><br><b>Similarity Criteria</b>:<br>1. <b>AAA</b> (Angle-Angle-Angle): If all three angles of one triangle equal all three angles of another triangle<br><br>2. <b>SAS</b> (Side-Angle-Side): If two sides of one triangle are proportional to two sides of another triangle, and the included angles are equal<br><br>3. <b>SSS</b> (Side-Side-Side): If all three sides of one triangle are proportional to the three sides of another triangle<br><br><b>Properties</b>:<br>- Corresponding sides are proportional<br>- Ratio of areas equals the square of the ratio of corresponding sides<br>- Ratio of perimeters equals the ratio of corresponding sides<br><br><b>Applications</b>: Measurement of heights, distances, engineering, architecture");
        return;
      }
  
      // HISTORY & GEOGRAPHY
      if (lowercaseMessage.includes('world war') || lowercaseMessage.includes('world war i') || lowercaseMessage.includes('world war 1')) {
        addBotMessage("🌍 <b>World War I (1914-1918)</b><br><br><b>Causes</b>:<br>- Militarism, Alliances, Imperialism, Nationalism (MAIN)<br>- Assassination of Archduke Franz Ferdinand<br><br><b>Major Participants</b>:<br>- Allied Powers: Britain, France, Russia, Italy, USA<br>- Central Powers: Germany, Austria-Hungary, Ottoman Empire<br><br><b>Key Events</b>:<br>- Trench warfare on Western Front<br>- Battle of Verdun, Battle of Somme<br>- Russian Revolution (1917)<br>- U.S. entry (1917)<br><br><b>Results</b>:<br>- Treaty of Versailles<br>- Fall of empires (German, Austro-Hungarian, Ottoman, Russian)<br>- League of Nations formed<br>- Redrawing of European map<br>- Set stage for World War II through harsh penalties on Germany<br><br>Approximately 20 million people died in this conflict.");
        return;
      }
      
      if (lowercaseMessage.includes('climate change') || lowercaseMessage.includes('global warming')) {
        addBotMessage("🌡️ <b>Climate Change</b><br><br><b>Causes</b>:<br>- Greenhouse gas emissions (CO₂, methane, nitrous oxide)<br>- Deforestation<br>- Industrial activities<br>- Agriculture and livestock<br><br><b>Effects</b>:<br>- Rising global temperatures<br>- Melting ice caps and glaciers<br>- Sea level rise<br>- Extreme weather events (floods, droughts, hurricanes)<br>- Threats to biodiversity<br>- Ocean acidification<br><br><b>Solutions</b>:<br>- Renewable energy (solar, wind, hydro)<br>- Energy efficiency<br>- Sustainable agriculture<br>- Reforestation<br>- Carbon pricing<br>- International cooperation (Paris Agreement)<br><br>Climate change is one of the most pressing challenges facing humanity in the 21st century.");
        return;
      }
  
      // Additional topics
      if (lowercaseMessage.includes('resources') || lowercaseMessage.includes('study material')) {
        addBotMessage("📚 <b>Study Resources for 10th Grade</b><br><br><b>Websites</b>:<br>- Khan Academy (videos, practice exercises)<br>- Byjus (interactive lessons)<br>- NCERT Solutions (textbook solutions)<br><br><b>Study Techniques</b>:<br>- Pomodoro Technique: 25 minutes study, 5 minutes break<br>- Active recall: Test yourself frequently<br>- Spaced repetition: Review material at increasing intervals<br><br><b>Exam Preparation</b>:<br>- Create summary notes<br>- Solve past papers<br>- Form study groups<br>- Teach concepts to others<br><br>Would you like me to suggest specific resources for any particular subject?");
        return;
      }
  
      // If no specific match, give a general response
      addBotMessage("That's an interesting question! I can help with many 10th grade topics including:<br><br>🧪 <b>Science</b> - biology, chemistry, physics<br>📊 <b>Math</b> - algebra, geometry, trigonometry<br>📜 <b>Social Studies</b> - history, geography, civics<br>📝 <b>Language</b> - grammar, literature<br><br>Could you please provide more details about your question or specify the subject you're asking about?");
    }
  
    // Get current time in HH:MM format
    function getCurrentTime() {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      
      return `${hours}:${minutes} ${ampm}`;
    }
  
    // Scroll chat to bottom
    function scrollToBottom() {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  
    // Add typing indicator styles
    const style = document.createElement('style');
    style.textContent = `
      .typing-indicator {
        color: #666;
        font-style: italic;
      }
      .typing-indicator span {
        animation: dot 1.3s infinite;
        display: inline-block;
      }
      .typing-indicator span:nth-child(2) {
        animation-delay: 0.2s;
      }
      .typing-indicator span:nth-child(3) {
        animation-delay: 0.4s;
      }
      @keyframes dot {
        0%, 20% { transform: translateY(0); }
        40% { transform: translateY(-5px); }
        60%, 100% { transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  });
