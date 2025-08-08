export const sampleApps = [
  {
    id: '1',
    title: 'Interactive Fraction Builder',
    description: 'Visual tool for understanding fractions through interactive pie charts and number lines. Perfect for grades 3-5.',
    author_id: 'user1',
    author_name: 'Sarah Mitchell',
    tags: ['math', 'fractions', 'grade-3', 'grade-4', 'grade-5', 'visual'],
    rating: 4.8,
    review_count: 124,
    download_count: 2341,
    created_at: '2024-01-15',
    screenshot_url: 'https://via.placeholder.com/400x300/4f46e5/ffffff?text=Fraction+Builder',
    status: 'published',
    html_content: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Fraction Builder</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .container {
            background: rgba(255,255,255,0.1);
            padding: 30px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
            text-align: center;
            max-width: 600px;
            width: 100%;
        }
        .fraction-display {
            background: rgba(255,255,255,0.9);
            color: #333;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }
        .circle {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            margin: 20px auto;
            border: 4px solid #1e40af;
            position: relative;
            background: conic-gradient(#3b82f6 0deg 90deg, #e5e7eb 90deg 360deg);
        }
        .fraction-text {
            font-size: 2rem;
            font-weight: bold;
            margin: 20px 0;
        }
        .controls {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin: 20px 0;
        }
        button {
            background: #3b82f6;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: background 0.2s;
        }
        button:hover {
            background: #2563eb;
        }
        .number-line {
            background: #f3f4f6;
            height: 60px;
            border-radius: 8px;
            margin: 20px 0;
            position: relative;
            display: flex;
            align-items: center;
        }
        .marker {
            width: 4px;
            height: 40px;
            background: #3b82f6;
            position: absolute;
            left: 25%;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🥧 Interactive Fraction Builder</h1>
        <div class="fraction-display">
            <h3>Visual Fraction: 1/4</h3>
            <div class="circle" id="fractionCircle"></div>
            <div class="fraction-text" id="fractionText">1/4</div>
            <div class="number-line">
                <div class="marker"></div>
                <span style="position: absolute; left: 0; bottom: -25px;">0</span>
                <span style="position: absolute; left: 50%; bottom: -25px;">1/2</span>
                <span style="position: absolute; right: 0; bottom: -25px;">1</span>
            </div>
        </div>
        <div class="controls">
            <button onclick="changeFraction(1, 2)">1/2</button>
            <button onclick="changeFraction(1, 3)">1/3</button>
            <button onclick="changeFraction(1, 4)">1/4</button>
            <button onclick="changeFraction(3, 4)">3/4</button>
        </div>
        <p>Click the buttons above to explore different fractions!</p>
    </div>

    <script>
        function changeFraction(numerator, denominator) {
            const circle = document.getElementById('fractionCircle');
            const text = document.getElementById('fractionText');
            const marker = document.querySelector('.marker');
            
            const percentage = (numerator / denominator) * 360;
            const position = (numerator / denominator) * 100;
            
            circle.style.background = \`conic-gradient(#3b82f6 0deg \${percentage}deg, #e5e7eb \${percentage}deg 360deg)\`;
            text.textContent = \`\${numerator}/\${denominator}\`;
            marker.style.left = \`\${position}%\`;
        }
    </script>
</body>
</html>`
  },
  {
    id: '2',
    title: 'Solar System Explorer',
    description: 'Take a journey through our solar system with interactive 3D models and fascinating facts about each planet.',
    author_id: 'user2',
    author_name: 'Dr. James Chen',
    tags: ['science', 'astronomy', 'space', 'grade-4', 'grade-5', 'grade-6', '3d'],
    rating: 4.9,
    review_count: 87,
    download_count: 1756,
    created_at: '2024-02-03',
    screenshot_url: 'https://via.placeholder.com/400x300/1e40af/ffffff?text=Solar+System',
    status: 'published',
    html_content: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Solar System Explorer</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            background: linear-gradient(to bottom, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
            color: white;
            font-family: Arial, sans-serif;
            text-align: center;
            min-height: 100vh;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        .solar-system {
            margin: 40px 0;
            padding: 40px;
            background: rgba(255,255,255,0.05);
            border-radius: 20px;
            position: relative;
        }
        .sun {
            width: 80px;
            height: 80px;
            background: radial-gradient(circle, #ffd700 0%, #ff8c00 100%);
            border-radius: 50%;
            margin: 0 auto 40px;
            box-shadow: 0 0 50px #ffd700;
            animation: glow 2s ease-in-out infinite alternate;
        }
        .planets {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            flex-wrap: wrap;
            margin: 30px 0;
        }
        .planet {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            transition: transform 0.3s;
            position: relative;
        }
        .planet:hover {
            transform: scale(1.2);
        }
        .mercury { background: #8c7853; }
        .venus { background: #ffc649; }
        .earth { background: #6b93d6; }
        .mars { background: #c1440e; }
        .jupiter { background: #f8ca6d; width: 60px; height: 60px; }
        .saturn { background: #fad5a5; width: 55px; height: 55px; }
        .uranus { background: #4fd0e7; }
        .neptune { background: #4b70dd; }
        .planet-info {
            background: rgba(255,255,255,0.1);
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            min-height: 100px;
        }
        button {
            background: #1e90ff;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 16px;
            margin: 10px;
            transition: background 0.2s;
        }
        button:hover {
            background: #1c7ed6;
        }
        @keyframes glow {
            from { box-shadow: 0 0 50px #ffd700; }
            to { box-shadow: 0 0 80px #ffd700; }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌟 Solar System Explorer</h1>
        <div class="solar-system">
            <div class="sun"></div>
            <p>Click on any planet to learn more!</p>
            <div class="planets">
                <div class="planet mercury" onclick="showPlanetInfo('Mercury')"></div>
                <div class="planet venus" onclick="showPlanetInfo('Venus')"></div>
                <div class="planet earth" onclick="showPlanetInfo('Earth')"></div>
                <div class="planet mars" onclick="showPlanetInfo('Mars')"></div>
                <div class="planet jupiter" onclick="showPlanetInfo('Jupiter')"></div>
                <div class="planet saturn" onclick="showPlanetInfo('Saturn')"></div>
                <div class="planet uranus" onclick="showPlanetInfo('Uranus')"></div>
                <div class="planet neptune" onclick="showPlanetInfo('Neptune')"></div>
            </div>
        </div>
        <div class="planet-info" id="planetInfo">
            <h3>Welcome to the Solar System!</h3>
            <p>Click on any planet above to discover amazing facts about our cosmic neighborhood.</p>
        </div>
        <button onclick="startTour()">🚀 Start Guided Tour</button>
    </div>

    <script>
        const planetData = {
            Mercury: "Mercury is the closest planet to the Sun and the smallest in our solar system. It has extreme temperature variations!",
            Venus: "Venus is the hottest planet with surface temperatures over 460°C due to its thick atmosphere!",
            Earth: "Earth is our home planet, the only known planet with life. It has one moon and 71% of its surface is water.",
            Mars: "Mars is called the Red Planet due to iron oxide on its surface. It has the largest volcano in the solar system!",
            Jupiter: "Jupiter is the largest planet and has over 80 moons! Its Great Red Spot is a storm larger than Earth.",
            Saturn: "Saturn is famous for its beautiful rings made of ice and rock particles. It's less dense than water!",
            Uranus: "Uranus rotates on its side and has faint rings. It's an ice giant with extreme seasons.",
            Neptune: "Neptune is the windiest planet with speeds up to 2,100 km/h! It's a beautiful blue ice giant."
        };

        function showPlanetInfo(planet) {
            const info = document.getElementById('planetInfo');
            info.innerHTML = \`<h3>\${planet}</h3><p>\${planetData[planet]}</p>\`;
        }

        function startTour() {
            alert('🚀 Tour starting! Visit each planet to learn amazing facts about our solar system!');
        }
    </script>
</body>
</html>`
  },
  {
    id: '3',
    title: 'Word Pattern Detective',
    description: 'Enhance vocabulary and pattern recognition through engaging word games and puzzles.',
    author_id: 'user3',
    author_name: 'Lisa Rodriguez',
    tags: ['english', 'vocabulary', 'patterns', 'grade-2', 'grade-3', 'word-games'],
    rating: 4.6,
    review_count: 203,
    download_count: 3128,
    created_at: '2024-01-28',
    screenshot_url: 'https://via.placeholder.com/400x300/059669/ffffff?text=Word+Detective',
    status: 'published',
    html_content: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Word Pattern Detective</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            background: linear-gradient(45deg, #059669 0%, #34d399 100%);
            color: white;
            font-family: Arial, sans-serif;
            min-height: 100vh;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            text-align: center;
        }
        .game-board {
            background: rgba(255,255,255,0.9);
            color: #333;
            padding: 30px;
            border-radius: 15px;
            margin: 20px 0;
        }
        .word-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            margin: 30px 0;
        }
        .word-card {
            background: #3b82f6;
            color: white;
            padding: 20px;
            border-radius: 10px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.2s;
        }
        .word-card:hover {
            transform: scale(1.05);
            background: #2563eb;
        }
        .word-card.mystery {
            background: #e5e7eb;
            color: #333;
            font-size: 24px;
        }
        .answer-options {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            margin: 20px 0;
        }
        .option {
            background: #f3f4f6;
            border: 2px solid #d1d5db;
            padding: 15px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
        }
        .option:hover {
            border-color: #059669;
            background: #ecfdf5;
        }
        .option.correct {
            background: #d1fae5;
            border-color: #10b981;
        }
        .option.wrong {
            background: #fee2e2;
            border-color: #ef4444;
        }
        button {
            background: #059669;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 16px;
            margin: 10px;
            transition: background 0.2s;
        }
        button:hover {
            background: #047857;
        }
        .score {
            font-size: 20px;
            margin: 20px 0;
            color: white;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔍 Word Pattern Detective</h1>
        <div class="score">Score: <span id="score">0</span>/5</div>
        
        <div class="game-board">
            <h3>Find the Pattern!</h3>
            <div class="word-grid" id="wordGrid">
                <div class="word-card">CAT</div>
                <div class="word-card">BAT</div>
                <div class="word-card">HAT</div>
                <div class="word-card mystery">?</div>
            </div>
            
            <p>What word completes the pattern?</p>
            
            <div class="answer-options" id="options">
                <div class="option" onclick="checkAnswer('RAT', true)">RAT</div>
                <div class="option" onclick="checkAnswer('DOG', false)">DOG</div>
                <div class="option" onclick="checkAnswer('SUN', false)">SUN</div>
                <div class="option" onclick="checkAnswer('CAR', false)">CAR</div>
            </div>
            
            <button onclick="nextPuzzle()" id="nextBtn" style="display: none;">Next Puzzle</button>
        </div>
        
        <button onclick="startGame()">🎮 New Game</button>
        <button onclick="showHint()">💡 Hint</button>
    </div>

    <script>
        let currentScore = 0;
        let currentPuzzle = 0;
        
        const puzzles = [
            {
                words: ['CAT', 'BAT', 'HAT'],
                answer: 'RAT',
                options: ['RAT', 'DOG', 'SUN', 'CAR'],
                hint: 'All words end with -AT!'
            },
            {
                words: ['BIG', 'DIG', 'FIG'],
                answer: 'PIG',
                options: ['PIG', 'COW', 'RUN', 'TOP'],
                hint: 'All words end with -IG!'
            },
            {
                words: ['SUN', 'FUN', 'RUN'],
                answer: 'BUN',
                options: ['BUN', 'CAT', 'HAT', 'DOG'],
                hint: 'All words end with -UN!'
            }
        ];

        function checkAnswer(selected, isCorrect) {
            const options = document.querySelectorAll('.option');
            options.forEach(option => {
                option.style.pointerEvents = 'none';
                if (option.textContent === selected) {
                    option.classList.add(isCorrect ? 'correct' : 'wrong');
                }
                if (option.textContent === puzzles[currentPuzzle].answer && !isCorrect) {
                    option.classList.add('correct');
                }
            });

            if (isCorrect) {
                currentScore++;
                document.getElementById('score').textContent = currentScore;
            }

            document.getElementById('nextBtn').style.display = 'inline-block';
        }

        function nextPuzzle() {
            currentPuzzle++;
            if (currentPuzzle >= puzzles.length) {
                alert(\`🎉 Game Complete! Final Score: \${currentScore}/\${puzzles.length}\`);
                startGame();
                return;
            }
            loadPuzzle();
        }

        function loadPuzzle() {
            const puzzle = puzzles[currentPuzzle];
            const grid = document.getElementById('wordGrid');
            const options = document.getElementById('options');
            
            grid.innerHTML = '';
            puzzle.words.forEach(word => {
                const card = document.createElement('div');
                card.className = 'word-card';
                card.textContent = word;
                grid.appendChild(card);
            });
            
            const mysteryCard = document.createElement('div');
            mysteryCard.className = 'word-card mystery';
            mysteryCard.textContent = '?';
            grid.appendChild(mysteryCard);
            
            options.innerHTML = '';
            puzzle.options.forEach(option => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'option';
                optionDiv.textContent = option;
                optionDiv.onclick = () => checkAnswer(option, option === puzzle.answer);
                options.appendChild(optionDiv);
            });
            
            document.getElementById('nextBtn').style.display = 'none';
        }

        function startGame() {
            currentScore = 0;
            currentPuzzle = 0;
            document.getElementById('score').textContent = currentScore;
            loadPuzzle();
        }

        function showHint() {
            alert('💡 Hint: ' + puzzles[currentPuzzle].hint);
        }
    </script>
</body>
</html>`
