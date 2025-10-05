'use server'

import { auth } from "../better-auth/auth"
import { inngest } from "../inngest/client"

export const signUpWithEmail = async({email, password, fullName, country, investmentGoals, preferredIndustry, riskTolerance}: SignUpFormData) => {
    try {
        const response = await auth.api.signUpEmail({
            body: {email: email, password: password, name: fullName}
        })

        if(response) {
            await inngest.send({
                name: "app/user.created",
                data: {
                    email: email,
                    name: fullName,
                    country,
                    investmentGoals,
                    riskTolerance,
                    preferredIndustry
                }
            })
        }

        return {success: true, data: response}

    } catch (e) {
        console.log('Sign Up Failed', e)
        return {success: false, error: "Sign Up Failed"}
    }
}