import secrets
import string

def generate_random_password(length=12):
    letters = string.ascii_letters
    digits = string.digits
    symbols = "!@#$%^&*()_+-=[]{}|"
    
    password = [
        secrets.choice(letters),
        secrets.choice(digits),
        secrets.choice(symbols),
    ]

    all_chars = letters + digits + symbols
    password += [secrets.choice(all_chars) for _ in range(length - 3)]

    secrets.SystemRandom().shuffle(password)

    return ''.join(password)
