
from forex_python.converter import CurrencyRates
import requests
import os

# Function to convert foreign currency to local currency
def convert_currency(amount, from_currency, to_currency):
    try:
        c = CurrencyRates()
        conversion_rate = c.get_rate(from_currency, to_currency)
        converted_amount = amount * conversion_rate
        return converted_amount
    except Exception as e:
        print(f"Error converting currency: {e}")
        return None

# Now initiate the MTN Mobile Money transaction using the converted amount in XOF
def create_mtn_payment(phone_number, amount_xof):
    mtn_api_key = os.getenv('MTN_API_KEY')  # Ensure you have this set in your environment variables
    mtn_base_url = 'https://sandbox.mtnmobilemoney.com'  # Sandbox URL, change for production

    headers = {
        'Authorization': f'Bearer {mtn_api_key}',
        'Ocp-Apim-Subscription-Key': 'your-subscription-key',  # Replace with your subscription key
        'X-Reference-Id': 'unique_transaction_reference',  # Ensure this is unique for every request
        'Content-Type': 'application/json'
    }

    payment_request = {
        'amount': amount_xof,
        'currency': 'XOF',  # Local currency for MTN Money (West African CFA franc)
        'externalId': 'unique_external_id',  # Replace with a unique transaction ID
        'payer': {
            'partyIdType': 'MSISDN',
            'partyId': phone_number,  # Phone number of the payer
        },
        'payerMessage': 'Payment for goods',
        'payeeNote': 'Thank you for your purchase'
    }

    try:
        response = requests.post(f'{mtn_base_url}/collection/v1_0/requesttopay', headers=headers, json=payment_request)
        if response.status_code == 202:
            print('MTN Mobile Money payment initiated successfully')
        else:
            print(f"Error in payment initiation: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"Error during payment request: {e}")

# Example: Convert USD to XOF and initiate MTN Mobile Money payment
usd_amount = 100  # Amount in USD
converted_xof = convert_currency(usd_amount, 'USD', 'XOF')

if converted_xof:
    print(f"Converted {usd_amount} USD to {converted_xof} XOF")
    # Initiate payment with MTN Mobile Money
    create_mtn_payment('233XXXXXXXXX', converted_xof)
else:
    print("Currency conversion failed. Payment not initiated.")
