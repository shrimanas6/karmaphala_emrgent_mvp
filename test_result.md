#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: |
  Build KarmaPhala - a Rapido/Snabbit/Urban-Company-inspired local services marketplace where users
  connect for help. Single account can switch between Customer (Offer Work) and Service Provider
  (Offer Service) modes. OTP-based login, provider onboarding, real-time matching, booking with
  start/end OTPs, ratings, and Karma Points. Teal + Gold design system.

backend:
  - task: "Auth: OTP send + verify (demo mode)"
    implemented: true
    working: true
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: true
        agent: "main"
        comment: "POST /api/auth/send-otp returns demoOtp; verify creates token. curl e2e passing."
  - task: "Profile registration + Mode switch"
    implemented: true
    working: true
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: true
        agent: "main"
        comment: "user/register, user/switch-mode working. Verified via curl."
  - task: "Provider setup + online toggle + geo search"
    implemented: true
    working: true
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: true
        agent: "main"
        comment: "Haversine distance filter working. 12 demo providers auto-seeded around Green Park. Search returns sorted by distance/rating."
  - task: "Booking lifecycle: create → accept → start OTP → end OTP → complete + karma"
    implemented: true
    working: true
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: true
        agent: "main"
        comment: "Full lifecycle validated end-to-end via curl. Karma points awarded (+25) on completion."

frontend:
  - task: "Landing page (teal + gold, hero, live helpers card, dual-mode cards)"
    implemented: true
    working: true
    file: "app/page.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: true
        agent: "main"
        comment: "Beautiful landing renders correctly. Fixed Framer Motion SSR blank-screen issue by removing initial opacity animations and Next.js 15 allowedDevOrigins."
  - task: "OTP auth flow + profile completion"
    implemented: true
    working: "NA"
    file: "app/page.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: "AuthMobile + AuthOtp + CompleteProfile screens built. Backend verified via curl. Frontend flow not fully clicked-through yet."
  - task: "Dashboard with mode switch (Customer/Provider), search, provider detail, tracking/booking, karma"
    implemented: true
    working: "NA"
    file: "app/page.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: "All screens implemented: home dashboard, popular services, provider search with filters (radius, profession, gender), provider detail + booking, live tracking with mock map, start/end OTP UI, rating, bookings list, provider onboarding wizard."

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 0
  run_ui: false

test_plan:
  current_focus:
    - "OTP auth flow + profile completion"
    - "Dashboard with mode switch (Customer/Provider), search, provider detail, tracking/booking, karma"
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

agent_communication:
  - agent: "main"
    message: |
      MVP built and aha moment verified. Landing page renders correctly.
      Backend E2E flow validated via curl:
        1. Send OTP → 2. Verify → 3. Register → 4. Search (12 providers) →
        5. Book → 6. Auto-accepted → 7. Start OTP → 8. Verify Start →
        9. End OTP → 10. Complete → +25 Karma awarded.
      Fixed Next.js 15 hydration blank-screen (Framer Motion + allowedDevOrigins).
  - agent: "main"
    message: |
      Feature: Real-time two-user testing flow.
      Backend additions: booking GET now returns `liveProviderLocation` + `providerIsOnline` from provider's live doc.
      Frontend additions:
        - Browser Geolocation captured (with fallback to Green Park). Cached in localStorage 5 min.
        - Provider mode auto-updates GPS every 15s while online + every 10s during an active job.
        - Customer SearchScreen auto-polls every 3s → new online providers appear without refresh (with "NEW" chip animation on freshly-arrived ones).
        - Live tracking map now uses actual lat/lng deltas of both parties; polls every 2.5s; shows "Live GPS" pulse chip if provider online, plus real distance and computed ETA.
        - Big attention modal + beep sound + browser Notification for provider on new incoming booking request.
        - "Test Mode" banner (with share-app-link copy button) on both Customer and Provider dashboards.
        - Provider setup auto-verifies (already existed) → labeled clearly as Test Mode bypass of Aadhaar/admin approval.
      Two-user curl simulation validated end-to-end:
        - Alice registers → Bob registers → Bob (Electrician) goes online 200m away →
          Bob appears #1 in Alice's search list (0.2km, ₹400/hr) →
          Alice books Bob (Fan repair, ₹800) — stays PENDING (no auto-accept for real users) →
          Bob gets pending request + notification →
          Bob accepts → Alice's tracking gets liveProviderLocation + providerIsOnline=true →
          Bob's GPS moves → chat both ways works →
          Start OTP 6526 → job started → End OTP 4505 → job completed, +25 karma each.
