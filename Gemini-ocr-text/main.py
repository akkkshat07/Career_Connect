import streamlit as st
import os
import google.generativeai as genai
from PIL import Image
from secret import GOOGLE_GEMINI_KEY
import pandas as pd
import io

# Set the page configuration as the first Streamlit command
st.set_page_config(page_title="Chapter Table Extraction App")

# Custom CSS for white background and black text
st.markdown("""
    <style>
        body, .stApp {
            background-color: white;
            color: black;
        }
        h1, h2, h3, h4, h5, h6, label, .css-1d391kg {  /* Add Streamlit-specific classes */
            color: black !important;
        }
    </style>
""", unsafe_allow_html=True)

# Configure the Google Gemini API
genai.configure(api_key=GOOGLE_GEMINI_KEY)

# Define functions here
def get_gemini_response(input_prompt, image):
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content([input_prompt, image[0]])
    return response.text

def input_image_setup(uploaded_file):
    # Check if a file has been uploaded
    if uploaded_file is not None:
        # Read the file into bytes
        bytes_data = uploaded_file.getvalue()

        image_parts = [
            {
                "mime_type": uploaded_file.type,  # Get the mime type of the uploaded file
                "data": bytes_data
            }
        ]
        return image_parts
    else:
        raise FileNotFoundError("No file uploaded")

def parse_gemini_response(response_text):
    lines = response_text.strip().split("\n")
    data = []
    
    # Skip header and process each row in the response
    for line in lines[1:]:  # Skipping the first line (header)
        parts = line.split("|")
        if len(parts) == 3:
            chapter_number = parts[0].strip()
            title = parts[1].strip()
            page_number = parts[2].strip()
            data.append([chapter_number, title, page_number])
    
    # Create DataFrame from the extracted data
    df = pd.DataFrame(data, columns=["Chapter Number", "Title", "Page Number"])
    return df

# Streamlit App interface
st.header("Chapter Table Extraction App")
uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png"])
image = ""

if uploaded_file is not None:
    image = Image.open(uploaded_file)
    st.image(image, caption="Uploaded Image.", use_column_width=True)

submit = st.button("Extract Details")

input_prompt = """
You are an expert in taking the details from the provided resume image. From that, you need to extract the name and skills of the person.
"""

# If submit button is clicked
if submit:
    image_data = input_image_setup(uploaded_file)
    response = get_gemini_response(input_prompt, image_data)
    
    st.header("The Extracted Response is:")
    st.write(response)  # Display the raw response

    # Parse the response to extract the table
    chapter_table_df = parse_gemini_response(response)
    # Display the table (uncomment if needed)
    # st.subheader("Extracted Chapter Table")
    # st.dataframe(chapter_table_df)

    # # Convert DataFrame to CSV (uncomment if needed)
    # csv = chapter_table_df.to_csv(index=False)

    # # Create a download button for the CSV file
    # st.download_button(
    #     label="Download Table as CSV",
    #     data=csv,
    #     file_name='chapter_table.csv',
    #     mime='text/csv',
    # )
