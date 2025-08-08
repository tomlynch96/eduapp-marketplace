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
    <title>Fraction Builder</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            height: 100vh;
            text-align: center;
        }
        .container {
            background: rgba(255,255,255,0.1);
            padding: 30px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
            max-width: 600px;
            margin: 0 auto;
        }
        button {
            background: #3b82f6;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🥧 Interactive Fraction Builder</h1>
        <p>Learn fractions through visual representations!</p>
        <button onclick="alert('Interactive fraction tools would be here!')">Try Demo</button>
    </div>
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
        button {
            background: #1e90ff;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <h1>🌟 Solar System Explorer</h1>
    <p>Discover the wonders of our cosmic neighborhood!</p>
    <button onclick="alert('Explore planets and their amazing facts!')">Start Exploration</button>
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
    <title>Word Pattern Detective</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            background: linear-gradient(45deg, #059669 0%, #34d399 100%);
            color: white;
            font-family: Arial, sans-serif;
            min-height: 100vh;
            text-align: center;
        }
        button {
            background: #059669;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <h1>🔍 Word Pattern Detective</h1>
    <p>Solve puzzles and discover hidden word patterns!</p>
    <button onclick="alert('Find the missing word in the pattern!')">Solve Puzzle</button>
</body>
</html>`
  }
]
