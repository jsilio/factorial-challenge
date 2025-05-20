# 🚲 Welcome to Famous Markus’ Bike Shop

Markus Bike Shop is known worldwide; it is not your typical store for those just starting out in the cycling world. Here, people come to buy custom-made bikes with top-quality components. We offer a unique experience that attracts people to travel thousands of kilometers to our shop to create the bike of their dreams. With the support of our staff, customers can select each part from a curated range of the finest elements.

Barack Obama's latest bike? He personally came in on Air Force One to customize it at our store.

Configuring your bike is a unique experience where the customer and we sit down together to design every possible aspect of the bike: the frame type, finish, color, wheel type, rim color, gearing system, and more.

Currently, we show customers physical catalogs and configure their ideal bike alongside them, noting down their selections on paper and calculating the total by hand. It’s time to change. We want to implement a system that allows the sales team to select the different available options and instantly show the customer a final price based on their selections.

### **How our customization works**

Customizing a bike typically involves selecting from five different parts:

1. **Frame type**: Full-suspension, diamond, step-through
2. **Frame finish**: Matte, shiny
3. **Wheels**: Road wheels, mountain wheels, fat bike wheels
4. **Rim color**: Red, black, blue
5. **Chain**: Single-speed chain, 8-speed chain

There are rules that prevent certain combinations, such as mountain wheels only being available for full-suspension frames or fat bike wheels not being available in red. We don’t have a clear list yet but we need to create a **flexible system** to manage this rules.

### Pricing calculation

Each item has a price, and the final price is the sum of the selected parts:

- Full-suspension frame = 130 EUR
- Shiny frame finish = 30 EUR
- Road wheels = 80 EUR
- Rim color (blue) = 20 EUR
- Chain (single-speed) = 43 EUR

**Total price**: 130 + 30 + 80 + 20 + 43 = **303 EUR**

Some prices depend on combinations of elements. For example, the **frame finish and rim color** might vary in price depending on the frame type or the wheel. A matte finish may cost 30 EUR for a full-suspension frame but 50 EUR.

This level of complexity is key when developing a configurator that will handle these cases smoothly, ensuring users can make selections that adhere to the rules while updating the price dynamically.

---

# 🖥 Your Job

The objective of this challenge is to develop an MVP that allows configuring a bicycle and calculating its price, **using only 8 hours of work**.

### What will we evaluate?

We know that in 8 hours you won’t deliver a perfect product, but we want to evaluate several things:

- **Problem approach**: Have you understood the specifics of the problem to offer a robust solution?
- **Planning**: We want to see what decisions you made to deliver an MVP, and understand what you focused on and why.
- **Code**: We want to see how you organize a project and what practices you follow when writing code.

---

# ✅ To evaluate

Once you deliver the challenge, we’ll schedule a second meeting with the rest of the team to evaluate your coding process, your ability to write clean code, your ability to analyze and your capacity to prioritize the project and your decisions.

---

# 🏆 What we expect from the tech challenge

Before you start coding we recommend you to read a guide of what we expect to see in a tech challenge. This page will help you to really put the focus on the things are important to us, and probably solve several questions that probably you have in your mind right now.

### Motivation

In the past, we have discarded several candidates based solely on their technical challenge, even before the code review phase. However, this approach has proven inadequate, as we often received feedback that the candidate's solution was "below our expectations" without any clear explanation. We found ourselves rejecting candidates who had provided a solution that met the project requirements, but we felt was not enough.

To address this issue, we have created this document to clarify our expectations and avoid discarding valid candidates who may have thought they were delivering exactly what we asked for. Also, we hope it will help candidates better understand what we are looking for in their solutions.

### Don’t take the statement by heart

The problem statement serves as a starting point for identifying and solving problems. Our team enjoys tackling challenges and delivering innovative solutions. As you work on the tech challenge, keep in mind that the recommended time is only a guideline. You may choose to use more or less time, as long as you are pleased with the outcome.

Success cannot be guaranteed by following a specific recipe. Some people may spend twice the recommended time and still deliver a subpar solution, while others may spend half the time and deliver an excellent one. The most important thing is to produce **something you are proud of**. That's why we encourage you to showcase a piece of software you have already developed rather than starting from scratch.

### Presentation

Please note that the technical challenge consists of two parts:

1. A static review of your project.
2. A discussion with us about your solution to solve our doubts/questions.

While the second part helps us to understand better how you think, explain, and evolve your solutions, the first part also reveals a lot about these. A good and clear structure for the project to improve navigability, a detailed README covering all the important aspects of the project (it is up to you to define what "important" means 😉), and a concise way to make your code more understandable are all important aspects that we want to see in your project. These aspects will definitely help us make a decision.

You should assume that people from different levels will assess your project, whether you are a junior or a senior. Any reviewer will have a chance to dig into your code and extract feedback from it. It is important that you take this into account and assume that we will have zero context about your solution besides the problem statement.

### Proof you are a one of a kind

In Factorial we are very lucky to receive several job applications, which allows us to choose between good candidates those that shine the brightest among all. If everyone sent the same solution that covered just the points the statement is asking for, the process would become boring, and finding a shining stars would be extremely hard.

As we mentioned before, this challenge is a great opportunity to shine, and demonstrate what makes you different than others. The best sign of that would be reviewing your own code as if you were us, and saying at the end: “ok, this is pretty good”.
