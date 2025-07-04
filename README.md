1. Activate the environment:

2. run : >>> docker run -p 6333:6333 -p 6334:6334 qdrant/qdrant

3. run : >>> python db/qdrant_setup.py

4. Start Frontend:
    >>> cd C:\Users\DELL\Downloads\GitHub\vva_v1\ui\frontend

    >>> npm install  # Only if not done already,installs all required packages listed in package.json

    >>> npm run build       # always run this after every change
    
    >>> npm run dev         # Or npm start depending on setup    

5. Start Backend API server:

    >>> uvicorn ui.app:app --reload

6. Sometimes after chaning any components or code, it may not reflect on the ui, its due to browser cache, to get rid of this, do hard refresh:

>>> Ctrl+Shift+R

7. If you're serving React statically (through FastAPI StaticFiles), make sure >>> npm run build was run after every change.

>>> npm run build

========================================

Till now this project has improvised ui (final) but its is proning to wrong answers if irrelevant vaasthu query is given.

WHAT I DID:
==========
Yes finally i solved the problem that this system is facing, from now no more wrong answer generation to the irrelevant queries, like hi, hello, i am shiva ....etc.

This project is successfully connected to the website that i have created specially for this project.