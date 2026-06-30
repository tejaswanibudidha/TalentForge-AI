from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title='TalentForge AI Service')

class ResumeData(BaseModel):
    name: Optional[str]
    email: Optional[str]
    phone: Optional[str]
    skills: Optional[List[str]] = []
    education: Optional[List[str]] = []
    experience: Optional[List[str]] = []
    projects: Optional[List[str]] = []
    certifications: Optional[List[str]] = []
    summary: Optional[str]

class JobData(BaseModel):
    title: str
    company: str
    description: str
    requiredSkills: Optional[List[str]] = []

class ResumeAnalysisRequest(BaseModel):
    resume: ResumeData

class AtsScoreRequest(BaseModel):
    resume: ResumeData
    jobDescription: str

class SkillGapRequest(BaseModel):
    resume: ResumeData
    job: JobData

class MatchRequest(BaseModel):
    resume: ResumeData
    job: JobData

class ImprovementRequest(BaseModel):
    resume: ResumeData
    jobDescription: Optional[str] = ''

class InterviewQuestionRequest(BaseModel):
    resume: ResumeData
    job: JobData
    categories: List[str]

class LearningResourcesRequest(BaseModel):
    missingSkills: List[str]

@app.post('/resume-analysis')
def resume_analysis(request: ResumeAnalysisRequest):
    skills = request.resume.skills or []
    strengths = [skill for skill in skills if skill.lower() in ['react', 'node', 'python', 'aws', 'docker']]
    weaknesses = [skill for skill in skills if skill.lower() not in ['react', 'node', 'python', 'aws', 'docker']]
    return {
        'summary': request.resume.summary or 'No summary available',
        'profile': request.resume,
        'strengths': strengths,
        'weaknesses': weaknesses
    }

@app.post('/ats-score')
def ats_score(request: AtsScoreRequest):
    resume_text = ' '.join([request.resume.summary or ''] + (request.resume.skills or []))
    keywords = set([word.lower() for word in request.jobDescription.split() if len(word) > 3])
    present = [word for word in keywords if word in resume_text.lower()]
    score = min(100, round((len(present) / max(len(keywords), 1)) * 100))
    return {
        'score': score,
        'missingKeywords': list(keywords - set(present)),
        'missingSkills': [skill for skill in (request.resume.skills or []) if skill.lower() not in request.jobDescription.lower()],
        'suggestions': ['Add keywords from the job description', 'Use consistent formatting', 'List projects using measurable results'],
        'summary': 'Match your resume to the job description and include missing keywords'
    }

@app.post('/skill-gap')
def skill_gap(request: SkillGapRequest):
    resume_skills = set([skill.lower() for skill in request.resume.skills or []])
    job_skills = set([skill.lower() for skill in request.job.requiredSkills or []])
    missing = [skill for skill in job_skills if skill not in resume_skills]
    existing = [skill for skill in resume_skills if skill in job_skills]
    recommended = [skill for skill in job_skills if skill not in resume_skills]
    return {
        'existingSkills': existing,
        'missingSkills': missing,
        'recommendedSkills': recommended
    }

@app.post('/match')
def match_job(request: MatchRequest):
    resume_skills = set([skill.lower() for skill in request.resume.skills or []])
    required = set([skill.lower() for skill in request.job.requiredSkills or []])
    intersect = resume_skills.intersection(required)
    score = int((len(intersect) / max(len(required), 1)) * 100)
    return {
        'matchScore': score,
        'matchedSkills': list(intersect),
        'unmatchedSkills': list(required - resume_skills)
    }

@app.post('/improvement')
def improvement(request: ImprovementRequest):
    missing = ['Add quantified achievements', 'Mention certifications', 'Include relevant keywords']
    return {
        'missingProjects': ['Add a project with measurable business impact'],
        'missingCertifications': ['List certifications that match the role'],
        'missingKeywords': ['Cloud', 'Microservices', 'Agile'],
        'summarySuggestion': 'Use a concise resume summary focused on impact and technologies.'
    }

@app.post('/interview-questions')
def interview_questions(request: InterviewQuestionRequest):
    questions = []
    if 'technical' in request.categories:
        questions.append(f'Explain how you used {request.job.requiredSkills[0] if request.job.requiredSkills else "a core skill"} in a project.')
    if 'hr' in request.categories:
        questions.append('Tell me about a time you overcame a challenging deadline.')
    if 'behavioral' in request.categories:
        questions.append('Describe a time when you had to collaborate with a difficult team member.')
    return {'questions': questions}

@app.post('/learning-resources')
def learning_resources(request: LearningResourcesRequest):
    resources = []
    for skill in request.missingSkills:
        resources.append({
            'skill': skill,
            'course': f'Practical {skill.title()} for modern roles',
            'platform': 'Coursera'
        })
    return {'resources': resources}
