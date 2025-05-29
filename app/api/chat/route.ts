import type { NextRequest } from "next/server"

export const maxDuration = 30

// Mock AI responses for demo purposes
const getMockResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase()

  // Emergency responses
  if (message.includes("chest pain") || message.includes("heart attack")) {
    return `🚨 **EMERGENCY ALERT** 🚨

I'm very concerned about your chest pain. This could be a serious medical emergency.

**IMMEDIATE ACTION REQUIRED:**
• Call 911 or go to the nearest emergency room RIGHT NOW
• Do not drive yourself - call an ambulance
• If you have aspirin and are not allergic, chew one 325mg tablet
• Stay calm and try to rest while waiting for help

**Warning Signs of Heart Attack:**
• Chest pain or pressure
• Pain radiating to arm, jaw, or back
• Shortness of breath
• Nausea or sweating
• Dizziness

**This is not a time to wait or seek online advice. Please get immediate medical attention.**

*Disclaimer: This is emergency guidance only. Professional medical care is essential.*`
  }

  if (message.includes("difficulty breathing") || message.includes("can't breathe")) {
    return `🚨 **BREATHING EMERGENCY** 🚨

Difficulty breathing requires immediate medical attention.

**CALL 911 IMMEDIATELY**

While waiting for help:
• Sit upright in a comfortable position
• Loosen tight clothing
• Try to stay calm
• If you have a rescue inhaler, use it as prescribed

**Do not delay - this could be life-threatening.**

*This AI cannot replace emergency medical care.*`
  }

  // Common health issues
  if (message.includes("headache")) {
    return `I understand you're experiencing a headache. Let me help you with some guidance.

**Immediate Relief Options:**
• Rest in a quiet, dark room
• Apply a cold or warm compress to your head/neck
• Stay hydrated - drink water
• Consider over-the-counter pain relief (if appropriate for you)

**When to Seek Medical Care:**
• Sudden, severe headache unlike any before
• Headache with fever, stiff neck, or rash
• Headache after a head injury
• Progressive worsening over days
• Headache with vision changes or confusion

**Self-Care Tips:**
• Maintain regular sleep schedule
• Manage stress
• Avoid known triggers
• Stay hydrated

Would you like me to help you assess if this headache needs immediate medical attention?

*Remember: I'm an AI assistant. For persistent or severe symptoms, consult a healthcare provider.*`
  }

  if (message.includes("fever")) {
    return `I can help you understand how to manage a fever safely.

**Current Fever Management:**
• Monitor temperature regularly
• Stay hydrated with water, clear broths, or electrolyte solutions
• Rest and avoid strenuous activity
• Dress lightly and keep room cool
• Consider fever reducers like acetaminophen or ibuprofen (follow package directions)

**Seek Medical Care If:**
• Temperature over 103°F (39.4°C)
• Fever lasts more than 3 days
• Severe symptoms: difficulty breathing, chest pain, severe headache
• Signs of dehydration
• Fever with rash or stiff neck

**For Children:** Lower thresholds apply - consult pediatrician for guidance.

**Red Flags:** 
• Difficulty breathing
• Persistent vomiting
• Severe abdominal pain
• Confusion or unusual behavior

How long have you had this fever, and what's your current temperature?

*This guidance doesn't replace professional medical advice.*`
  }

  if (message.includes("cut") || message.includes("wound") || message.includes("bleeding")) {
    return `I can guide you through proper wound care for minor cuts.

**For Minor Cuts:**
1. **Clean your hands** with soap and water
2. **Stop bleeding** by applying direct pressure with clean cloth
3. **Clean the wound** gently with water (avoid hydrogen peroxide on open wounds)
4. **Apply antibiotic ointment** if available
5. **Cover with sterile bandage**
6. **Change bandage daily** and keep wound clean

**Seek Medical Care If:**
• Deep cut that won't stop bleeding after 10 minutes of direct pressure
• Cut is longer than ½ inch or gapes open
• Cut is on face, joints, hands, or genitals
• Object embedded in wound
• Signs of infection: increased pain, redness, warmth, pus, red streaking

**Tetanus Consideration:**
• If wound is from dirty/rusty object and tetanus shot isn't current

**Watch for Infection Signs:**
• Increased pain after first day
• Redness spreading from wound
• Warmth around wound
• Pus or unusual drainage
• Red streaking from wound
• Fever

Is this a minor cut, or does it seem like it might need medical attention?

*For serious wounds, don't hesitate to seek immediate medical care.*`
  }

  if (message.includes("nausea") || message.includes("vomiting") || message.includes("stomach")) {
    return `I can help you manage nausea and stomach discomfort.

**Immediate Relief:**
• Sip clear fluids slowly (water, clear broths, ginger tea)
• Try the BRAT diet: Bananas, Rice, Applesauce, Toast
• Rest and avoid strong odors
• Consider ginger (tea, candies, or supplements)
• Eat small, frequent meals when ready

**Avoid:**
• Large meals
• Fatty, spicy, or dairy foods
• Strong smells
• Lying down immediately after eating

**Seek Medical Care If:**
• Severe abdominal pain
• Blood in vomit or stool
• Signs of dehydration (dizziness, dry mouth, little/no urination)
• High fever with vomiting
• Vomiting prevents keeping fluids down for 24+ hours
• Severe or worsening symptoms

**Hydration is Key:**
• Small sips every 15 minutes
• Ice chips or popsicles
• Electrolyte solutions

How long have you been experiencing these symptoms?

*Persistent or severe symptoms require medical evaluation.*`
  }

  if (message.includes("sleep") || message.includes("insomnia") || message.includes("tired")) {
    return `I understand you're having trouble with sleep. Good sleep is crucial for health.

**Sleep Hygiene Tips:**
• Keep a consistent sleep schedule (same bedtime/wake time daily)
• Create a relaxing bedtime routine
• Keep bedroom cool, dark, and quiet
• Avoid screens 1 hour before bed
• Limit caffeine after 2 PM
• Avoid large meals and alcohol before bedtime

**Natural Sleep Aids:**
• Chamomile tea
• Warm bath before bed
• Reading or gentle stretching
• Deep breathing exercises
• Progressive muscle relaxation

**When to Seek Help:**
• Insomnia lasting more than 2 weeks
• Excessive daytime sleepiness
• Loud snoring or breathing interruptions
• Restless legs or frequent movement during sleep
• Sleep issues affecting daily functioning

**Avoid:**
• Sleeping pills without medical supervision
• Daytime naps longer than 20 minutes
• Exercise within 3 hours of bedtime
• Heavy meals before sleep

How long have you been experiencing sleep difficulties?

*Chronic sleep problems may require medical evaluation.*`
  }

  // General health question
  return `Thank you for reaching out to HealthBot AI. I'm here to provide general health information and guidance.

**I can help with:**
• General health questions and education
• Symptom assessment and when to seek care
• First aid guidance
• Medication information (general)
• Wellness and prevention tips

**Important Reminders:**
• I cannot diagnose medical conditions
• I cannot prescribe medications
• For emergencies, call 911 immediately
• For serious symptoms, consult a healthcare provider

**To better assist you, please:**
• Describe your specific symptoms or concerns
• Mention how long you've been experiencing them
• Note any factors that make them better or worse

What specific health question or concern can I help you with today?

*This AI provides educational information only and doesn't replace professional medical advice.*`
}

export async function POST(req: NextRequest) {
  try {
    console.log("Chat API route called")

    const body = await req.json()
    const { messages } = body

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "Invalid messages format" }, { status: 400 })
    }

    const lastMessage = messages[messages.length - 1]?.content || ""
    console.log("User message:", lastMessage)

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Get mock response
    const aiResponse = getMockResponse(lastMessage)
    console.log("Generated response length:", aiResponse.length)

    // Return a simple JSON response that useChat can handle
    return Response.json({
      id: `msg-${Date.now()}`,
      role: "assistant",
      content: aiResponse,
      created_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Chat API error:", error)

    return Response.json(
      {
        error: "Unable to process your request. Please try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
