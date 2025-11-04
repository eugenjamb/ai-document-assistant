import os
from langchain_community.llms import HuggingFaceHub
from langchain.chains import RetrievalQA

def get_qa_chain(vectordb):
    retriever = vectordb.as_retriever(search_kwargs={"k": 3})
    llm = HuggingFaceHub(
        repo_id="mistralai/Mistral-7B-Instruct-v0.2",
        model_kwargs={"temperature": 0.3, "max_length": 512},
        huggingfacehub_api_token=os.getenv("HUGGINGFACEHUB_API_TOKEN")
    )
    return RetrievalQA.from_chain_type(llm=llm, retriever=retriever)
