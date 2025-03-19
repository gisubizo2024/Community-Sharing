"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Loader2, Copy, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SetupTwoFactor() {
  const router = useRouter()
  const [verificationCode, setVerificationCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  // This would be generated on the server in a real app
  const recoveryCode = "ABCD-EFGH-IJKL-MNOP"

  const handleCopyCode = () => {
    navigator.clipboard.writeText(recoveryCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, any 6-digit code works
      if (verificationCode.length === 6) {
        router.push("/dashboard")
      } else {
        setError("Please enter a valid 6-digit code")
        setIsLoading(false)
      }
    } catch (err) {
      setError("Verification failed. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-blue-700">Set Up Two-Factor Authentication</CardTitle>
          <CardDescription>Enhance your account security with 2FA</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label>Recovery Code</Label>
            <div className="flex items-center space-x-2">
              <div className="bg-gray-100 p-3 rounded-md font-mono text-sm flex-1 text-center">{recoveryCode}</div>
              <Button variant="outline" size="icon" onClick={handleCopyCode} title="Copy recovery code">
                {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Save this recovery code in a secure place. You'll need it if you lose access to your authentication
              device.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-md text-center">
              <p className="text-sm text-gray-700 mb-2">For this demo, we're simulating 2FA setup.</p>
              <p className="text-sm text-gray-700">
                In a real app, you would scan a QR code with an authenticator app like Google Authenticator or Authy.
              </p>
            </div>

            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="verificationCode">Verification Code</Label>
                <Input
                  id="verificationCode"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
                  required
                />
                <p className="text-xs text-gray-500">For this demo, enter any 6 digits to proceed</p>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify and Complete Setup"
                )}
              </Button>
            </form>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" className="text-gray-600" onClick={() => router.push("/dashboard")}>
            Skip for now (not recommended)
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

