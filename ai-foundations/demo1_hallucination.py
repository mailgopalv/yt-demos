"""Demo 1: why AI makes things up, and the fix.

Run it twice:
    python demo1_hallucination.py              # just the question
    python demo1_hallucination.py --with-menu  # today's menu pasted in first
"""
import sys
from pathlib import Path

from dotenv import load_dotenv
from google import genai

load_dotenv()  # puts GEMINI_API_KEY from .env into the environment
client = genai.Client()  # reads GEMINI_API_KEY from the environment

question = "What's today's special at Tony's Pizza?"
prompt = question

# The fix: put the right information "on the desk" before the question.
if "--with-menu" in sys.argv:
    menu = (Path(__file__).parent / "tonys_menu.txt").read_text(encoding="utf-8")
    prompt = f"Here is today's menu:\n\n{menu}\n\n{question}"

print(f"You: {question}")
if "--with-menu" in sys.argv:
    print("     (with today's menu pasted in)")

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt,
)

# response.text is None when Gemini blocks or declines the question.
answer = response.text or "(declined to answer)"
print(f"\nGemini: {answer}")
