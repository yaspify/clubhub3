"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { clubs } from "@/lib/data"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Globe,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  MessageCircle,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Award,
  Users,
  CalendarDays,
  ThumbsUp,
  ThumbsDown,
  Utensils,
  CreditCard,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function ClubDetailPage() {
  const pathname = usePathname()
  const slug = pathname.split("/").pop()

  // Find the club by slug
  const club = clubs.find((club) => club.slug === slug)

  if (!club) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">Club not found</p>
      </div>
    )
  }

  // Map social media platforms to their respective icons
  const socialIcons: Record<string, React.ReactNode> = {
    Instagram: <Instagram className="h-4 w-4" />,
    Facebook: <Facebook className="h-4 w-4" />,
    X: <Twitter className="h-4 w-4" />,
    YouTube: <Youtube className="h-4 w-4" />,
    Website: <Globe className="h-4 w-4" />,
    LINE: <MessageCircle className="h-4 w-4" />,
  }

  return (
    <div className="container max-w-6xl mx-auto">
      {/* Hero section */}
      <div className="mb-8 flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/3">
          <div className="w-full aspect-square relative overflow-hidden rounded-xl shadow-md">
            {club.profileImage ? (
              <Image
                src={club.profileImage || "/placeholder.svg"}
                alt={club.clubName || "Club"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full text-2xl font-bold text-white bg-gradient-to-br from-blue-500 to-purple-600">
                {(club.clubName || "Club").substring(0, 2)}
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-2/3 space-y-4">
          <h1 className="text-4xl font-bold">{club.clubName}</h1>
          
          {club.affiliation && <div className="text-lg text-muted-foreground">所属: {club.affiliation}</div>}

          {club.activityDetails?.summary && <p className="text-lg leading-relaxed">{club.activityDetails.summary}</p>}

          {/* Tags */}
          {club.tags && club.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {club.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Social Links */}
          {club.externalLinks && Object.keys(club.externalLinks).filter((k) => k !== "weighted").length > 0 && (
            <div className="flex flex-wrap gap-3 pt-2">
              {Object.entries(club.externalLinks).map(
                ([platform, link]) =>
                  platform !== "weighted" &&
                  link && (
                    <a
                      key={platform}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-sm"
                    >
                      {socialIcons[platform] || null}
                      {platform}
                    </a>
                  ),
              )}
            </div>
          )}
        </div>
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="activity" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="activity">活動詳細</TabsTrigger>
          <TabsTrigger value="members">メンバー構成</TabsTrigger>
          <TabsTrigger value="recruitment">新歓情報</TabsTrigger>
        </TabsList>

        {/* Activity Details Tab */}
        <TabsContent value="activity" className="space-y-6">
          {club.activityDetails && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Activity Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle>基本情報</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {club.activityDetails.location && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium">活動場所</h3>
                        <p>{club.activityDetails.location}</p>
                      </div>
                    </div>
                  )}

                  {club.activityDetails.frequency && (
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium">活動頻度</h3>
                        <p>{club.activityDetails.frequency}</p>
                      </div>
                    </div>
                  )}

                  {club.activityDetails.record && (
                    <div className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium">実績</h3>
                        <p className="whitespace-pre-line">{club.activityDetails.record}</p>
                      </div>
                    </div>
                  )}

                  {club.activityDetails.meal && (
                    <div className="flex items-start gap-3">
                      <Utensils className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium">食事会</h3>
                        <p>{club.activityDetails.meal}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Costs Card */}
              <Card>
                <CardHeader>
                  <CardTitle>費用</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {club.activityDetails.fee && (
                    <div className="flex items-start gap-3">
                      <DollarSign className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium">活動費</h3>
                        <p>{club.activityDetails.fee}</p>
                      </div>
                    </div>
                  )}

                  {club.activityDetails.membershipFee && (
                    <div className="flex items-start gap-3">
                      <CreditCard className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium">会費</h3>
                        <p>{club.activityDetails.membershipFee}</p>
                      </div>
                    </div>
                  )}

                  {club.activityDetails.initialCost && (
                    <div className="flex items-start gap-3">
                      <CreditCard className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium">初期費用</h3>
                        <p>{club.activityDetails.initialCost}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Feelings Card - Only show if either positive or negative exists */}
              {(club.activityDetails.feelingPositive || club.activityDetails.feelingNegative) && (
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>メンバーの声</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {club.activityDetails.feelingPositive && (
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <ThumbsUp className="h-5 w-5 text-green-600" />
                          <h3 className="font-medium text-green-700">良い点</h3>
                        </div>
                        <p className="text-green-800">{club.activityDetails.feelingPositive}</p>
                      </div>
                    )}

                    {club.activityDetails.feelingNegative && (
                      <div className="bg-red-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <ThumbsDown className="h-5 w-5 text-red-600" />
                          <h3 className="font-medium text-red-700">大変な点</h3>
                        </div>
                        <p className="text-red-800">{club.activityDetails.feelingNegative}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>

        {/* Members Tab */}
        <TabsContent value="members" className="space-y-6">
          {club.memberComposition && (
            <Card>
              <CardHeader>
                <CardTitle>メンバー情報</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Basic Member Info */}
                  <div className="space-y-4">
                    {club.memberComposition.totalMembers && (
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium">総メンバー数</h3>
                          <p className="text-2xl font-bold">{club.memberComposition.totalMembers}</p>
                        </div>
                      </div>
                    )}

                    {club.memberComposition.foundingYear && (
                      <div className="flex items-start gap-3">
                        <CalendarDays className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium">設立年</h3>
                          <p className="text-2xl font-bold">{club.memberComposition.foundingYear}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Gender Distribution */}
                  {club.memberComposition.gender &&
                    Object.entries(club.memberComposition.gender).some(([, value]) => value) && (
                      <div>
                        <h3 className="font-medium mb-3">性別構成</h3>
                        <div className="space-y-2">
                          {Object.entries(club.memberComposition.gender).map(
                            ([gender, percentage]) =>
                              percentage && (
                                <div key={gender} className="space-y-1">
                                  <div className="flex justify-between text-sm">
                                    <span>{gender}</span>
                                    <span>{percentage}</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                      className={cn(
                                        "h-2.5 rounded-full",
                                        gender === "Male" ? "bg-blue-500" : "bg-pink-500",
                                      )}
                                      style={{
                                        width: percentage.includes("%")
                                          ? percentage
                                          : `${(Number.parseInt(percentage) / Number.parseInt(club.memberComposition?.totalMembers || "100")) * 100}%`,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              ),
                          )}
                        </div>
                      </div>
                    )}

                  {/* Belonging Distribution */}
                  {club.memberComposition.belonging && Object.entries(club.memberComposition.belonging).length > 0 && (
                    <div>
                      <h3 className="font-medium mb-3">所属構成</h3>
                      <div className="space-y-2">
                        {Object.entries(club.memberComposition.belonging).map(([department, percentage], index) => (
                          <div key={department} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{department}</span>
                              <span>{percentage}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div
                                className="h-2.5 rounded-full"
                                style={{
                                  width: percentage.includes("%") ? percentage : `${Number.parseInt(percentage)}%`,
                                  backgroundColor: `hsl(${index * 40}, 70%, 60%)`,
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Grade Levels */}
                {club.memberComposition.gradeLevels &&
                  Object.entries(club.memberComposition.gradeLevels).some(([, value]) => value) && (
                    <div className="mt-8">
                      <h3 className="font-medium mb-3">学年構成</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {Object.entries(club.memberComposition.gradeLevels).map(
                          ([grade, count]) =>
                            count && (
                              <div key={grade} className="bg-gray-100 p-3 rounded-lg text-center">
                                <div className="text-sm text-muted-foreground">{grade}</div>
                                <div className="text-xl font-bold">{count}</div>
                              </div>
                            ),
                        )}
                      </div>
                    </div>
                  )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Recruitment Tab */}
        <TabsContent value="recruitment" className="space-y-6">
          {club.recruitmentInfo && (
            <Card>
              <CardHeader>
                <CardTitle>新歓情報</CardTitle>
              </CardHeader>
              <CardContent>
                {typeof club.recruitmentInfo === "string" ? (
                  <div className="prose max-w-none">
                    <p>{club.recruitmentInfo}</p>
                  </div>
                ) : club.recruitmentInfo.welcomeSchedule ? (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium">歓迎スケジュール</h3>
                        <div className="prose max-w-none mt-2">
                          <p className="whitespace-pre-line">{club.recruitmentInfo.welcomeSchedule}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          )}

          {/* Secret Description */}
          {club.secretDescription && (
            <Card>
              <CardHeader>
                <CardTitle>その他</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{club.secretDescription}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Footer with last update */}
      {club.lastUpdate && (
        <div className="mt-8 text-sm text-muted-foreground text-right">最終更新: {club.lastUpdate}</div>
      )}
    </div>
  )
}

