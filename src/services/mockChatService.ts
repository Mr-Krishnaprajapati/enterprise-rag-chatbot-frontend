import type { Citation, Message } from "../types";

const MOCK_DOCUMENTS = [
  {
    id: "doc-1",
    title: "Employee Handbook 2024",
    content:
      "All employees are entitled to 20 days of paid time off (PTO) per year. PTO requests must be submitted at least 2 weeks in advance via the HR portal. Unused PTO can be carried over up to 5 days into the next calendar year.",
  },
  {
    id: "doc-2",
    title: "Remote Work Policy",
    content:
      "The company adopts a hybrid work model. Employees are expected to be in the office at least 3 days a week. Remote work days should be coordinated with the team lead to ensure coverage during core business hours (10 AM - 4 PM).",
  },
  {
    id: "doc-3",
    title: "IT Security Guidelines",
    content:
      "Passwords must be at least 12 characters long and include a mix of uppercase letters, lowercase letters, numbers, and special symbols. Multi-factor authentication (MFA) is mandatory for accessing all internal systems.",
  },
  {
    id: "doc-4",
    title: "Health & Wellness Benefits 2024",
    content:
      "We offer comprehensive health insurance plans including medical, dental, and vision coverage. Employees also have access to a $500 annual wellness stipend for gym memberships or fitness equipment. Mental health support is available 24/7 via our EAP.",
  },
  {
    id: "doc-5",
    title: "Travel & Expense Policy",
    content:
      "Business class travel is approved for international flights over 8 hours. Daily meal allowance is capped at $75 per day. All expenses must be submitted within 30 days of incurring the cost with valid receipts attached.",
  },
  {
    id: "doc-6",
    title: "Annual Performance Review Guidelines",
    content:
      "Performance reviews are conducted annually in Q4. Employees must complete their self-assessment by October 15th. Managers will conduct review meetings in November. Ratings determine eligibility for annual bonuses and promotions.",
  },
];

const MOCK_RESPONSES: Record<string, { text: string; citationIds: string[] }> =
  {
    pto: {
      text: "According to the Employee Handbook, you are entitled to 20 days of paid time off per year. You need to submit requests 2 weeks in advance.",
      citationIds: ["doc-1"],
    },
    remote: {
      text: "Our remote work policy is hybrid. You should be in the office 3 days a week and coordinate remote days with your team lead.",
      citationIds: ["doc-2"],
    },
    password: {
      text: "For security, passwords must be 12+ characters with mixed case, numbers, and symbols. MFA is also required.",
      citationIds: ["doc-3"],
    },
    health: {
      text: "Our benefits package includes medical, dental, and vision coverage, plus a $500 annual wellness stipend. Mental health support is also available.",
      citationIds: ["doc-4"],
    },
    expense: {
      text: "For expenses, we cover business class for 8hr+ flights and provide a $75/day meal allowance. Please submit receipts within 30 days.",
      citationIds: ["doc-5"],
    },
    performance: {
      text: "Performance reviews happen in Q4. Self-assessments are due Oct 15th, and manager reviews occur in November. These impact bonuses and promotions.",
      citationIds: ["doc-6"],
    },
    default: {
      text: "I can help you with questions about company policies, such as PTO, remote work, IT security, health benefits, expenses, or performance reviews. What would you like to know?",
      citationIds: [],
    },
  };

export const sendMessageToBot = async (query: string): Promise<Message> => {
  return new Promise((resolve, reject) => {
    // Simulating network latency (2-3 seconds)
    const latency = Math.floor(Math.random() * 1000) + 2000;

    setTimeout(() => {
      // Randomly simulate API failures (5% chance)
      if (Math.random() < 0.05) {
        reject(
          new Error(
            "Failed to connect to the knowledge base. Please try again.",
          ),
        );
        return;
      }

      const lowerQuery = query.toLowerCase();
      let responseKey = "default";

      if (
        lowerQuery.includes("pto") ||
        lowerQuery.includes("leave") ||
        lowerQuery.includes("vacation")
      )
        responseKey = "pto";
      else if (
        lowerQuery.includes("remote") ||
        lowerQuery.includes("home") ||
        lowerQuery.includes("office")
      )
        responseKey = "remote";
      else if (
        lowerQuery.includes("password") ||
        lowerQuery.includes("security") ||
        lowerQuery.includes("access")
      )
        responseKey = "password";
      else if (
        lowerQuery.includes("health") ||
        lowerQuery.includes("insurance") ||
        lowerQuery.includes("benefit") ||
        lowerQuery.includes("medical")
      )
        responseKey = "health";
      else if (
        lowerQuery.includes("expense") ||
        lowerQuery.includes("travel") ||
        lowerQuery.includes("flight") ||
        lowerQuery.includes("reimbursement")
      )
        responseKey = "expense";
      else if (
        lowerQuery.includes("performance") ||
        lowerQuery.includes("review") ||
        lowerQuery.includes("goal") ||
        lowerQuery.includes("rating") ||
        lowerQuery.includes("bonus")
      )
        responseKey = "performance";

      const mockResponse = MOCK_RESPONSES[responseKey];

      const citations: Citation[] = mockResponse.citationIds.map((id) => {
        const doc = MOCK_DOCUMENTS.find((d) => d.id === id)!;
        const randomPage = Math.floor(Math.random() * 5) + 1;
        return {
          id: `cit-${Math.random().toString(36).substr(2, 9)}`,
          documentId: doc.id,
          title: doc.title,
          page: randomPage,
          snippet: doc.content.substring(0, 100) + "...",
          documentContent: doc.content,
        };
      });

      resolve({
        id: `msg-${Date.now()}`,
        role: "assistant",
        content: mockResponse.text,
        citations: citations,
        timestamp: Date.now(),
        status: "sent",
      });
    }, latency);
  });
};
