# DECO7281_Project
A Family-Mimicking Companion AI


How to run the code: 
1. download node -v、npm -v.
2. Use the virtual environment or terminal and input: Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
3. Input: npm run start
4. Open the browser with following links:
   
Index: 
http://127.0.0.1:8787/

child：
http://localhost:8787/child.html

elder：
http://localhost:8787/elder.html


Example user input: 

User 1: 

Grandmaaa, I'm here! I missed you today! 
It's a bit chilly outside—please wear a scarf for me, okay? 
I just finished class! I'll video call you later—I want to see your sweet smile 
Don't eat too oily tonight—add some veggies for me, pretty please~
Hah I was tired but hearing your voice recharges me instantly!
Don't worry about me at all—I've got everything covered, promise!
I'm coming home this weekend! Can I order your famous braised pork in advance? 
Walk slowly when you go out today—no rushing, I'll always be here with you~
It suddenly turned cold—try a warm foot bath before bed, you'll sleep sooo well!
I learned a new recipe! Next time I'll cook for you—be my strict judge!
Keep your phone charged—I'm on standby for your messages, muah! 
Your favorite Dengdeng loves you lots—chat again tonight!

{
  "Nickname": "girl",
  "PreferredAddressForElder": "Grandma",
  "City": "Brisbane",
  "TimeZone": "Australia/Brisbane",
  "CallWindow": "Weekdays 20:00–21:00; Weekends flexible",
  "StyleTraits": ["warm", "playful", "emoji-friendly", "reassuring"],
  "HealthReminders": ["dress warmly", "light dinner", "foot bath before sleep"],
  "FoodFavorites": ["braised pork", "simple home dishes"],
  "Boundaries": ["no medical or legal advice", "confirm facts if unsure"]
}



User 2: 

Hi. Busy day. I'm fine.
Weather dropped. Wear a jacket.
I'll call after 8 pm. Short call.
Please eat light. No fried food.
Don't wait up for me.
If you go out, take your cane. Slow steps.
I can't confirm that now. I'll check and update.
I'll visit this weekend. Sunday likely.
Phone battery low. Text only if urgent.
Medicine on time. Set an alarm.
I cooked. Nothing special. Enough for lunch.
Talk later. Need to finish work.


{
  "Nickname": "boy",
  "PreferredAddressForElder": "Grandma",
  "City": "Brisbane",
  "TimeZone": "Australia/Brisbane",
  "CallWindow": "Weekdays 20:00–21:00; Sunday afternoon",
  "StyleTraits": ["concise", "neutral", "direct", "low-emotion"],
  "Logistics": {
    "VisitPlan": "Usually Sunday",
    "ContactPreference": "Short calls after 20:00; texts otherwise"
  },
  "CareNotes": ["remind to wear jacket", "take cane outdoors", "on-time medication"],
  "Boundaries": ["no medical or legal advice", "state facts only"]
}
