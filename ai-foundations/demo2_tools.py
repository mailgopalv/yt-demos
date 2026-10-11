"""Demo 2: tools, and the loop that runs them (the harness).

    python demo2_tools.py
    python demo2_tools.py "Is order 1043 ready yet?"
"""
import sys

from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()  # puts GEMINI_API_KEY from .env into the environment
client = genai.Client()  # reads GEMINI_API_KEY from the environment

# --- Tony's tiny fake order database --------------------------------------
ORDERS = {
    "1042": "Out for delivery, about 10 minutes away.",
    "1043": "In the oven, ready in about 15 minutes.",
    "1044": "Delivered at 7:12pm.",
}


def check_order_status(order_id):
    """The real work. Gemini can't run this: our code does."""
    return ORDERS.get(order_id, f"No order found with number {order_id}.")


# --- The tool, described so Gemini knows it exists ------------------------
tools = [
    types.Tool(
        function_declarations=[
            types.FunctionDeclaration(
                name="check_order_status",
                description="Looks up where a Tony's Pizza order is, by order number.",
                parameters_json_schema={
                    "type": "object",
                    "properties": {
                        "order_id": {"type": "string", "description": "The order number, e.g. 1042"}
                    },
                    "required": ["order_id"],
                },
            )
        ]
    )
]

config = types.GenerateContentConfig(
    system_instruction="You are Tony's Pizza assistant. Be warm and brief.",
    tools=tools,
)
question = sys.argv[1] if len(sys.argv) > 1 else "Where's my order? It's number 1042."
contents = [types.Content(role="user", parts=[types.Part(text=question)])]
print(f"Customer: {question}\n")

# --- The loop: this is the harness ----------------------------------------
while True:
    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=contents,
        config=config,
    )

    # No tool requested? Then Gemini has written its final answer.
    if not response.function_calls:
        answer = response.text or "(declined to answer)"
        print(f"Gemini: {answer}")
        break

    # Gemini asked for a tool. Keep its message in the conversation...
    contents.append(response.candidates[0].content)

    # ...run each tool it asked for, and send the results back.
    results = []
    for call in response.function_calls:
        print(f"[Gemini asks]  {call.name}({call.args})")
        result = check_order_status(**call.args)
        print(f"[Our code]     ran it -> {result}\n")
        results.append(types.Part.from_function_response(name=call.name, response={"result": result}))
    contents.append(types.Content(role="user", parts=results))
