from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from utils.document_loader import process_pdf
from utils.vector_store import get_vector_store
from utils.llm_chain import get_qa_chain

app = FastAPI(title="AI Document Assistant")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

vectordb = get_vector_store()

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    docs = process_pdf(file)
    vectordb.add_documents(docs)
    vectordb.persist()
    return {"message": f"{file.filename} uploaded and processed successfully."}

@app.post("/query")
async def query_document(question: str = Form(...)):
    qa = get_qa_chain(vectordb)
    answer = qa.run(question)
    return {"answer": answer}

@app.get("/")
def root():
    return {"message": "AI Document Assistant is running 🚀"}
