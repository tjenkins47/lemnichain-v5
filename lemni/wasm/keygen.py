# /lemni/wasm/keygen.py

def generate_mock_keys():
    return {
        "public_key": "MOCK_PUBLIC_KEY_ABC123",
        "private_key": "MOCK_PRIVATE_KEY_XYZ789"
    }

if __name__ == "__main__":
    keys = generate_mock_keys()
    print("Generated keys:", keys)
