import { useState } from 'react';
import './chatbot.scss';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: "Hi! I'm your real estate assistant. How can I help you today?", 
      isBot: true,
      quickActions: [
        "Show Properties",
        "Price Range",
        "Popular Locations",
        "Contact Agent"
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);

  // Sample property data for Adajan
  const adajanProperties = [
    {
      name: "Luxurious 3BHK in Green Avenue",
      price: "₹85 lakhs",
      location: "Green Avenue, Adajan",
      features: ["3 BHK", "1550 sq ft", "2 parking", "24/7 security"],
      amenities: ["Swimming Pool", "Gym", "Children's Play Area"],
      possession: "Ready to Move"
    },
    {
      name: "Premium 4BHK Villa",
      price: "₹1.5 crore",
      location: "Palm City, Adajan",
      features: ["4 BHK", "2800 sq ft", "Garden", "Modular Kitchen"],
      amenities: ["Club House", "Tennis Court", "24/7 Security"],
      possession: "Ready in 6 months"
    },
    {
      name: "Modern 2BHK Apartment",
      price: "₹55 lakhs",
      location: "River Palace, Adajan Gam",
      features: ["2 BHK", "1200 sq ft", "River View", "Furnished"],
      amenities: ["Garden", "Parking", "Power Backup"],
      possession: "Ready to Move"
    }
  ];

  const formatProperty = (property) => {
    return `🏢 Property: ${property.name}\n\n` +
           `💰 Price: ${property.price}\n` +
           `📍 Location: ${property.location}\n\n` +
           `✨ Features:\n   • ${property.features.join('\n   • ')}\n\n` +
           `🎯 Amenities:\n   • ${property.amenities.join('\n   • ')}\n\n` +
           `🔑 Possession: ${property.possession}\n\n` +
           `------------------------------------------\n\n` +
           `Would you like to:\n` +
           `1️⃣ Schedule a visit?\n` +
           `2️⃣ See another property?\n` +
           `3️⃣ Get more details about this property?`;
  };

  const handleQuickAction = (action) => {
    // Add user's selected action as a message
    setMessages(prev => [...prev, { text: action, isBot: false }]);

    // Generate bot response based on the action
    const botResponse = generateBotResponse(action.toLowerCase());
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: botResponse, 
        isBot: true,
        quickActions: getQuickActions(action)
      }]);
    }, 500);
  };

  const getQuickActions = (lastMessage) => {
    if (lastMessage.toLowerCase().includes('popular locations')) {
      return ["Adajan", "Vesu", "City Light", "Pal"];
    }
    if (lastMessage.toLowerCase().includes('location') || lastMessage.toLowerCase().includes('area')) {
      return ["Show Properties", "Price Range", "Contact Agent", "Back to Menu"];
    }
    if (lastMessage.toLowerCase().includes('property') || lastMessage.toLowerCase().includes('show')) {
      return ["Adajan Area", "Vesu Area", "City Light", "Show Price Range"];
    }
    if (lastMessage.toLowerCase().includes('adajan')) {
      return ["See Next Property", "Schedule Visit", "More Details", "Other Areas"];
    }
    if (lastMessage.toLowerCase().includes('price') || lastMessage.toLowerCase().includes('budget')) {
      return ["Under 50L", "50L - 1Cr", "Above 1Cr", "Show Properties"];
    }
    if (lastMessage.toLowerCase().includes('contact') || 
        lastMessage.toLowerCase().includes('agent') || 
        lastMessage.toLowerCase().includes('reach')) {
      return ["Schedule Call", "Visit Office", "WhatsApp", "Email"];
    }
    if (lastMessage.toLowerCase().includes('call') || 
        lastMessage.toLowerCase().includes('email') || 
        lastMessage.toLowerCase().includes('whatsapp')) {
      return ["Show Properties", "Price Range", "Popular Locations", "Back to Menu"];
    }
    // Default quick actions
    return ["Show Properties", "Price Range", "Popular Locations", "Contact Agent"];
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Add user message
    setMessages(prev => [...prev, { text: inputMessage, isBot: false }]);

    // Generate bot response
    const botResponse = generateBotResponse(inputMessage.toLowerCase());
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: botResponse, 
        isBot: true,
        quickActions: getQuickActions(inputMessage)
      }]);
    }, 500);

    setInputMessage('');
  };

  const generateBotResponse = (userInput) => {
    userInput = userInput.toLowerCase();

    if (userInput.includes('adajan')) {
      return formatProperty(adajanProperties[currentPropertyIndex]);
    }
    else if (userInput.includes('another') || userInput.includes('next') || userInput.includes('more')) {
      const nextIndex = (currentPropertyIndex + 1) % adajanProperties.length;
      setCurrentPropertyIndex(nextIndex);
      return formatProperty(adajanProperties[nextIndex]);
    }
    else if (userInput.includes('schedule') || userInput.includes('visit')) {
      return "Sure! Please provide your preferred date and time for the site visit, and our agent will contact you to confirm the appointment.";
    }
    else if (userInput.includes('details') || userInput.includes('more info')) {
      const property = adajanProperties[currentPropertyIndex];
      return `Additional details for ${property.name}:\n\n` +
             `🏗️ Construction: Premium quality RCC frame structure\n` + 
             `🚰 Water Supply: 24/7 corporation + borewell water\n` +
             `⚡ Power Backup: 100% power backup\n` +
             `🚗 Parking: Covered parking available\n` +
             `🏢 Total Floors: Ground + 12 floors\n` +
             `🎯 Distance:\n` +
             `   • 5 mins to main road\n` +
             `   • 10 mins to railway station\n` +
             `   • Walking distance to market\n\n` +
             `Would you like to schedule a visit?`;
    }
    else if (userInput.includes('property') || userInput.includes('house') || userInput.includes('apartment')) {
      return "I can help you find properties! Which area of Surat interests you? We have excellent properties in areas like Adajan, Vesu, City Light, and Pal.";
    }
    else if (userInput.includes('price') || userInput.includes('cost') || userInput.includes('budget')) {
      return "In Adajan area, properties range from ₹45 lakhs to ₹2 crores. What's your budget range? I can help you find properties within your budget.";
    }
    else if (userInput.includes('location') || userInput.includes('where')) {
      return "In Surat, we have properties in premium locations like Adajan, Vesu, City Light, and Pal. Adajan is particularly popular for its riverside location. Which area would you like to explore?";
    }
    else if (userInput.includes('contact') || userInput.includes('agent')) {
      return "You can reach us through:\n" +
             "📞 Call: +91 98984544220\n" +
             "📧 Email: pdev444444@gmail.com\n\n" +
             "How would you like to connect with us?";
    }
    else if (userInput.includes('hello') || userInput.includes('hi')) {
      return "Hello! I'm here to help you find your perfect property in Surat. Are you interested in any specific area like Adajan, Vesu, or City Light?";
    }
    else if (userInput.includes('schedule call')) {
      return "Our agent will call you shortly at your convenient time. Please provide your preferred time for the call.";
    }
    else if (userInput.includes('whatsapp')) {
      return "You can WhatsApp us at: +91 98984544220\nOur team will respond within 30 minutes.";
    }
    else if (userInput.includes('email')) {
      return "You can email us at: pdev444444@gmail.com\nWe usually respond within 24 hours.";
    }
    else if (userInput.includes('visit office')) {
      return "Our office is located at:\n📍 123, Crystal Plaza, Adajan Road, Surat\nWorking hours: 10 AM - 7 PM (Mon-Sat)";
    }
    else if (userInput.includes('popular locations')) {
      return "Here are the popular locations in Surat:\n\n" +
             "1. 🌟 Adajan\n" +
             "   • Premium riverside location\n" +
             "   • Luxury apartments and villas\n" +
             "   • Close to Hazira Road\n\n" +
             "2. 🌟 Vesu\n" +
             "   • Near VR Mall and Hospitals\n" +
             "   • Modern high-rise apartments\n" +
             "   • Educational institutions nearby\n\n" +
             "3. 🌟 City Light\n" +
             "   • Commercial hub\n" +
             "   • Premium residential area\n" +
             "   • Close to Dumas Road\n\n" +
             "4. 🌟 Pal\n" +
             "   • Developing area\n" +
             "   • Affordable housing\n" +
             "   • Good connectivity\n\n" +
             "Which location would you like to explore?";
    }
    else if (userInput.includes('vesu')) {
      return "Properties in Vesu Area:\n\n" +
             "🏢 Available Properties:\n" +
             "• 2 BHK Apartments: ₹45L - 65L\n" +
             "• 3 BHK Apartments: ₹75L - 1.2Cr\n" +
             "• Premium Villas: ₹1.5Cr onwards\n\n" +
             "📍 Key Highlights:\n" +
             "• Near VR Mall and Hospitals\n" +
             "• Premium Schools Nearby\n" +
             "• Excellent connectivity\n\n" +
             "Would you like to see specific properties in Vesu?";
    }
    else if (userInput.includes('city light')) {
      return "Properties in City Light Area:\n\n" +
             "🏢 Available Properties:\n" +
             "• 2 BHK Apartments: ₹55L - 75L\n" +
             "• 3 BHK Apartments: ₹85L - 1.4Cr\n" +
             "• Luxury Penthouses: ₹2Cr onwards\n\n" +
             "📍 Key Highlights:\n" +
             "• Prime Commercial Area\n" +
             "• High-end Restaurants\n" +
             "• Shopping Districts\n\n" +
             "Would you like to see specific properties in City Light?";
    }
    else if (userInput.includes('pal')) {
      return "Properties in Pal Area:\n\n" +
             "🏢 Available Properties:\n" +
             "• 1 BHK Apartments: ₹25L - 35L\n" +
             "• 2 BHK Apartments: ₹35L - 55L\n" +
             "• 3 BHK Apartments: ₹55L - 85L\n\n" +
             "📍 Key Highlights:\n" +
             "• Developing Area\n" +
             "• Affordable Housing\n" +
             "• New Infrastructure\n\n" +
             "Would you like to see specific properties in Pal?";
    }
    else {
      return "I can help you find properties in Surat's best locations. You can:\n" +
             "1. Ask about specific areas (like 'Show me properties in Adajan')\n" +
             "2. Specify your budget\n" +
             "3. Ask about amenities and features\n" +
             "What would you like to know?";
    }
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Real Estate Assistant</h3>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className="message-container">
                <div className={`message ${message.isBot ? 'bot' : 'user'}`}>
                  {message.isBot && <i className="fas fa-robot bot-icon"></i>}
                  <p>{message.text}</p>
                </div>
                {message.isBot && message.quickActions && (
                  <div className="quick-actions">
                    {message.quickActions.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        onClick={() => handleQuickAction(action)}
                        className="quick-action-btn"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        <i className="fas fa-robot"></i>
      </button>
    </div>
  );
};

export default Chatbot; 