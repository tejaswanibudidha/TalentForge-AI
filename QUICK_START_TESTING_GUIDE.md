# TalentForge AI - Quick Start & Testing Guide

## 🚀 Quick Start

### 1. Start Backend Server
```bash
cd backend
npm install  # If first time
npm start
```

**Expected Output:**
```
✓ MongoDB connected (or in-memory fallback)
✓ Seed data created: 5 companies, 10 jobs, 5 recruiters, 15 candidates, 50 applications
✓ Server running on http://localhost:5000
```

### 2. Start Frontend
```bash
cd client
npm install  # If first time
npm run dev
```

**Expected Output:**
```
✓ Vite dev server ready at http://localhost:5173
✓ Or http://localhost:5174 if port in use
```

---

## 🧪 Testing Scenarios

### Scenario 1: Recruiter Views Own Applications Only

#### Step 1: Login as Recruiter A (TCS)
```
Email: rajesh.tcs@talentforge.com
Password: password123
Role: recruiter
```

#### Step 2: Navigate to Recruiter Dashboard
- Go to `/dashboard/recruiter` or find recruiter dashboard link
- Should see: "TCS Job Openings, Applications for my jobs"

#### Step 3: Check Applications
- Should see ~10 applications (TCS applications only)
- Should NOT see any Infosys/Wipro/Accenture/Cognizant applications

#### Step 4: Verify Isolation
```bash
# In browser console or via API:
GET /api/applications/recruiter/{rajesh_user_id}
# Result: ONLY TCS applications
```

---

### Scenario 2: Switch Recruiter
#### Step 1: Logout (Rajesh)
#### Step 2: Login as Recruiter B (Infosys)
```
Email: priya.infosys@talentforge.com
Password: password123
```

#### Step 3: Check Applications
- Should see: ~10 different applications (Infosys only)
- Should NOT see Rajesh's (TCS) applications
- Completely different set of applications ✓

---

### Scenario 3: Candidate Applies to Job

#### Step 1: Logout as Recruiter
#### Step 2: Login as Candidate
```
Email: candidate1@talentforge.com
Password: password123
Role: jobseeker
```

#### Step 3: Navigate to Jobs
- Browse available job listings
- Click "Apply" on any job

#### Step 4: Fill Application Form
- Step 1: Enter personal details (name, email, phone, location)
- Step 2: Add education (institution, degree, field, year)
- Step 3: Add skills (e.g., "Java", "Spring Boot", "SQL")
- Step 4: Optional cover letter
- Click Submit

#### Step 5: Verify Application Submitted
- Should see success message
- Navigate to Candidate Dashboard
- Should see new application in the list
- Status should be "Applied"

#### Step 6: Verify Recruiter Receives
- Logout as candidate
- Login as the RECRUITER who posted that job
- Navigate to recruiter dashboard
- Should see the new application from candidate1 ✓

---

### Scenario 4: Update Application Status

#### Step 1: Login as Recruiter (who posted the job)
#### Step 2: View Application in Recruiter Dashboard
- Find the candidate's application
- See their resume and scores

#### Step 3: Update Status
- Click status dropdown (currently "Applied")
- Change to "Under Review" or "Shortlisted"
- Status should update immediately

#### Step 4: Verify from Candidate Side
- Logout as recruiter
- Login as candidate
- Go to Candidate Dashboard
- Application status should show the updated status ✓

---

## 🔍 API Testing

### Test Recruiter Isolation via API

#### Get All Companies
```bash
curl -X GET http://localhost:5000/api/companies
# Result: 5 companies (TCS, Infosys, Wipro, Accenture, Cognizant)
```

#### Get Jobs
```bash
curl -X GET http://localhost:5000/api/jobs
# Result: 10 open jobs across 5 companies
```

#### Get Recruiter A's Applications (after login)
```bash
curl -X GET http://localhost:5000/api/applications/recruiter/{rajesh_user_id} \
  -H "Authorization: Bearer {token}"
# Result: ~10 applications for TCS jobs only
```

#### Get Recruiter B's Applications (after login)
```bash
curl -X GET http://localhost:5000/api/applications/recruiter/{priya_user_id} \
  -H "Authorization: Bearer {token}"
# Result: ~10 DIFFERENT applications for Infosys jobs only
# Rajesh's applications NOT visible
```

#### Submit Application as Candidate
```bash
curl -X POST http://localhost:5000/api/applications \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {candidate_token}" \
  -d '{
    "jobId": "job-001",
    "personalDetails": {
      "fullName": "Test Candidate",
      "email": "test@example.com",
      "phone": "9876543210",
      "location": "Delhi"
    },
    "education": [{
      "institution": "IIT Delhi",
      "degree": "B.Tech",
      "field": "Computer Science",
      "graduationYear": "2022"
    }],
    "skills": ["Java", "Python", "SQL"],
    "additionalInfo": "I am interested in this role"
  }'
# Result: New application created with recruiterId automatically set from job.recruiterId
```

---

## 🛠️ Troubleshooting

### Issue: "MongoDB connection failed"
**Solution**: 
- Start MongoDB locally, OR
- Backend falls back to in-memory database (data lost on restart)

### Issue: "Recruiter sees other recruiter's applications"
**Check**:
- Verify application has correct recruiterId
- Confirm recruiterId matches job.recruiterId
- Check API returns correct query filters

### Issue: "Application not appearing in Candidate Dashboard"
**Check**:
- Confirm application was created in database
- Verify candidateId matches logged-in user
- Try GET `/api/applications/candidate/{user_id}`

### Issue: "Port 5000 already in use"
**Solution**: 
- Kill process on port 5000: `lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill`
- Or modify `backend/src/index.js` to use different port

### Issue: "Port 5173 already in use"
**Solution**: 
- Vite automatically falls back to 5174
- Check `http://localhost:5174`

---

## 📊 Demo Data Reference

### 5 Recruiters (for login testing)
| Name | Email | Password | Company |
|------|-------|----------|---------|
| Rajesh | rajesh.tcs@talentforge.com | password123 | TCS |
| Priya | priya.infosys@talentforge.com | password123 | Infosys |
| Amit | amit.wipro@talentforge.com | password123 | Wipro |
| Sarah | sarah.accenture@talentforge.com | password123 | Accenture |
| Michael | michael.cognizant@talentforge.com | password123 | Cognizant |

### 15 Demo Candidates (for job seeker testing)
```
candidate1@talentforge.com - candidate15@talentforge.com
Password: password123 (for all)
```

### 5 Companies (auto-created)
- TCS - Mumbai (Backend jobs mostly)
- Infosys - Bangalore (Full-stack jobs)
- Wipro - Bangalore (Frontend jobs)
- Accenture - Dublin (Cloud jobs)
- Cognizant - New Jersey (DevOps/Data jobs)

### 10 Demo Jobs
```
TCS:
- Java Developer (Job ID: job-001)
- Frontend Developer (Job ID: job-002)

Infosys:
- Python Developer (Job ID: job-003)
- Data Analyst (Job ID: job-004)

Wipro:
- React Developer (Job ID: job-005)
- Cloud Engineer (Job ID: job-006)

Accenture:
- Full Stack Developer (Job ID: job-007)
- AI/ML Engineer (Job ID: job-008)

Cognizant:
- Software Engineer (Job ID: job-009)
- DevOps Engineer (Job ID: job-010)
```

---

## ✅ Verification Checklist

- [ ] Backend starts without errors
- [ ] Seed data creates all records
- [ ] Frontend loads at http://localhost:5173 (or 5174)
- [ ] Can login as recruiter
- [ ] Recruiter dashboard shows ONLY their applications
- [ ] Can login as candidate
- [ ] Candidate can apply to jobs
- [ ] Application form is multi-step
- [ ] New application appears in recruiter's dashboard
- [ ] Recruiter can update application status
- [ ] Status updates visible to candidate
- [ ] Recruiter A cannot see Recruiter B's applications
- [ ] API returns correct filters for each user
- [ ] No hardcoded UI data - all from MongoDB

---

## 🎯 Key Testing Points

### Recruiter Isolation (Most Critical)
✓ Recruiter A logs in → Sees only TCS applications
✓ Recruiter B logs in → Sees only Infosys applications
✓ No cross-recruiter data leakage
✓ Query automatically filters by recruiter ID

### Application Flow
✓ Candidate submits application → Application gets recruiter ID from job
✓ Application appears in correct recruiter's dashboard
✓ Recruiter sees candidate profile, scores, resume
✓ Recruiter updates status → Candidate sees update

### Data Integrity
✓ All data from MongoDB APIs (no hardcoded)
✓ Company/Job/Application relationships maintained
✓ Scores (AI, ATS, Skill Match) are numeric values
✓ Application statuses from predefined enum

---

## 🚀 Performance Testing

### Expected Performance
- Jobs list loads: < 1 second
- Company page loads: < 1 second  
- Recruiter dashboard loads: < 2 seconds
- Application submission: < 500ms
- Status update: < 500ms

### Load Testing
```bash
# Test recruiter dashboard with 50+ applications
# Verify UI remains responsive
# Check query optimization if slow
```

---

## 📝 Notes

1. **First Run**: Database is populated automatically with 85 demo records
2. **Data Persistence**: With MongoDB - data persists between restarts. Without MongoDB - data resets on restart
3. **Authentication**: Uses JWT tokens stored in localStorage
4. **Recruiter Isolation**: Enforced at database query level, not UI level (secure by design)

---

## Support Commands

```bash
# Check if MongoDB is running
mongosh

# Restart MongoDB
brew services restart mongodb-community

# Check port 5000
lsof -i :5000

# Kill process on port 5000
kill -9 <PID>

# View backend logs
tail -f backend/src/index.js output

# Clear browser cache
# Chrome: Ctrl+Shift+Delete
# Firefox: Ctrl+Shift+Delete

# Test API endpoint
curl http://localhost:5000/api/jobs
```

---

**System Ready for Testing! 🎉**
