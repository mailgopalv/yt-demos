# AI Basics, Part 2: How AI Works in Real Apps — demo code

Two tiny Python demos from Part 2 of the AI Basics series, using Gemini through the Google Gen AI SDK.

## Setup

1. Install Python 3.10 or newer.
2. Install the dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Get an API key from <https://aistudio.google.com/apikey> and put it in a `.env`
   file next to the demos:

   ```
   GEMINI_API_KEY=your-key-here
   ```

Each run makes one or two small API calls and costs a fraction of a cent.

## Demo 1: why AI makes things up

```bash
python demo1_hallucination.py              # the model has never seen today's menu
python demo1_hallucination.py --with-menu  # paste the menu in: RAG in miniature
```

Without the menu, Gemini either says it doesn't know or guesses. With the menu
"on the desk" (in the prompt), it answers correctly from `tonys_menu.txt`.

## Demo 2: tools and the harness

```bash
python demo2_tools.py
python demo2_tools.py "Is order 1043 ready yet?"
```

Gemini can't check orders itself. It asks to call `check_order_status`, our
code runs it against a tiny fake database, sends the result back, and Gemini
writes the reply. The `while True` loop doing that is the harness.
