import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";

const openAIApiKey = process.env.OPENAI_API_KEY
const llm = new ChatOpenAI({ openAIApiKey })

const punctuationTemplate = `Given a sentence, add punctuation where needed. Do not change anything else.
    sentence: {sentence}
    sentence with punctuation:  
    `
const punctuationPrompt = PromptTemplate.fromTemplate(punctuationTemplate)

const chain1 = punctuationPrompt
                .pipe(llm)
                .pipe(x => x.content)

console.log("CHECKER-Punctuation:", await chain1.invoke({ sentence: 'i am tirsty do u has water' }))

const grammarTemplate = `Given a sentence correct the grammar.
sentence: {punctuated_sentence}
sentence with correct grammar: 
`
const grammarPrompt = PromptTemplate.fromTemplate(grammarTemplate)

const chain2 = punctuationPrompt
                .pipe(llm)
                .pipe(x => x.content)
                .pipe(x => grammarPrompt.invoke({ punctuated_sentence: x }))
                .pipe(llm)
                .pipe(x => x.content)

console.log("CHECKER-Grammar:", await chain2.invoke({ sentence: 'i am tirsty do u has water' }))

const translationTemplate = `Given a sentence, translate that sentence into {language}
    sentence: {grammatically_correct_sentence}
    translated sentence:
    `
const translationPrompt = PromptTemplate.fromTemplate(translationTemplate)

const chain3 = punctuationPrompt
                .pipe(llm)
                .pipe(x => x.content)
                .pipe(x => grammarPrompt.invoke({ punctuated_sentence: x }))
                .pipe(llm)
                .pipe(x => x.content)
                .pipe(x => translationPrompt.invoke({ grammatically_correct_sentence: x, language: 'mandarin' }))
                .pipe(llm)
                .pipe(x => x.content)

console.log("CHECKER-Translate:", await chain3.invoke({ sentence: 'i is tirsty do u has water' }))

async function translate({sentence, language}) {
    const chain = punctuationPrompt
        .pipe(llm)
        .pipe(x => x.content)
        .pipe(x => grammarPrompt.invoke({ punctuated_sentence: x }))
        .pipe(llm)
        .pipe(x => x.content)
        .pipe(x => translationPrompt.invoke({ grammatically_correct_sentence: x, language: language }))
        .pipe(llm)
        .pipe(x => x.content)
    return await chain.invoke({ sentence: sentence })
}

const response = await translate({
    sentence: 'i dont liked mondays',
    language: 'portuguese'
})

console.log('FINAL:', response)
