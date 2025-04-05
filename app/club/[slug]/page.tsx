"use client";

import { usePathname } from "next/navigation";
import { clubs } from "@/lib/data";
import Image from "next/image";

export default function Page() {
  const pathname = usePathname();
  const slug = pathname.split("/").pop();

  // Find the club by slug
  const club = clubs.find((club) => club.slug === slug);
  if (!club) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">Club not found</p>
      </div>
    );
  }
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Profile image and basic details */}
        <div>
          <div className="w-full aspect-square mb-4">
            {club.profileImage ? (
              <Image
                src={club.profileImage || "/placeholder.svg"}
                alt={club.clubName || "Club"}
                width={500}
                height={500}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full text-sm font-medium text-muted-foreground bg-muted rounded-lg">
                {(club.clubName || "Club").substring(0, 5)}
              </div>
            )}
          </div>
          
          {/* External Links */}
          {club.externalLinks && Object.keys(club.externalLinks).length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">外部リンク</h3>
              <div className="space-y-1">
                {Object.entries(club.externalLinks).map(([platform, link]) => (
                  platform !== "weighted" && link && (
                    <a 
                      key={platform} 
                      href={link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:underline"
                    >
                      {platform}
                    </a>
                  )
                ))}
              </div>
            </div>
          )}
          
          {/* Tags */}
          {club.tags && club.tags.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">タグ</h3>
              <div className="flex flex-wrap gap-2">
                {club.tags.map(tag => (
                  <span 
                    key={tag}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Last update */}
          {club.lastUpdate && (
            <div className="mt-4 text-xs text-gray-500">
              最終更新: {club.lastUpdate}
            </div>
          )}
        </div>
        
        {/* Right column - Club details */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold">{club.clubName}</h1>
            {club.verified && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">認証済み</span>
            )}
          </div>
          
          {club.affiliation && (
            <div className="text-sm text-muted-foreground mb-4">所属: {club.affiliation}</div>
          )}
          
          {/* Activity Details */}
          {club.activityDetails && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">活動詳細</h2>
              <div className="space-y-2">
                {club.activityDetails.summary && (
                  <p className="text-muted-foreground">{club.activityDetails.summary}</p>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {club.activityDetails.location && (
                    <div>
                      <h3 className="text-sm font-medium">活動場所</h3>
                      <p>{club.activityDetails.location}</p>
                    </div>
                  )}
                  {club.activityDetails.frequency && (
                    <div>
                      <h3 className="text-sm font-medium">活動頻度</h3>
                      <p>{club.activityDetails.frequency}</p>
                    </div>
                  )}
                  {club.activityDetails.fee && (
                    <div>
                      <h3 className="text-sm font-medium">費用</h3>
                      <p>{club.activityDetails.fee}</p>
                    </div>
                  )}
                  {club.activityDetails.record && (
                    <div>
                      <h3 className="text-sm font-medium">実績</h3>
                      <p className="whitespace-pre-line">{club.activityDetails.record}</p>
                    </div>
                  )}
                  {club.activityDetails.meal && (
                    <div>
                      <h3 className="text-sm font-medium">食事会</h3>
                      <p>{club.activityDetails.meal}</p>
                    </div>
                  )}
                  {club.activityDetails.membershipFee && (
                    <div>
                      <h3 className="text-sm font-medium">会費</h3>
                      <p>{club.activityDetails.membershipFee}</p>
                    </div>
                  )}
                  {club.activityDetails.initialCost && (
                    <div>
                      <h3 className="text-sm font-medium">初期費用</h3>
                      <p>{club.activityDetails.initialCost}</p>
                    </div>
                  )}
                </div>
                
                {/* Feelings sections */}
                <div className="mt-4 space-y-2">
                  {club.activityDetails.feelingPositive && (
                    <div>
                      <h3 className="text-sm font-medium text-green-600">良い点</h3>
                      <p className="text-sm">{club.activityDetails.feelingPositive}</p>
                    </div>
                  )}
                  {club.activityDetails.feelingNegative && (
                    <div>
                      <h3 className="text-sm font-medium text-red-600">大変な点</h3>
                      <p className="text-sm">{club.activityDetails.feelingNegative}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Member Composition */}
          {club.memberComposition && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">メンバー構成</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {club.memberComposition.totalMembers && (
                  <div>
                    <h3 className="text-sm font-medium">総メンバー数</h3>
                    <p>{club.memberComposition.totalMembers}</p>
                  </div>
                )}
                {club.memberComposition.foundingYear && (
                  <div>
                    <h3 className="text-sm font-medium">設立年</h3>
                    <p>{club.memberComposition.foundingYear}</p>
                  </div>
                )}
                
                {/* Grade levels */}
                {/* {club.memberComposition.gradeLevels && 
                 Object.entries(club.memberComposition.gradeLevels).some(([_grade, value]) => value) && (
                  <div className="sm:col-span-2">
                    <h3 className="text-sm font-medium">学年構成</h3>
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      {Object.entries(club.memberComposition.gradeLevels).map(([grade, count]) => 
                        count && (
                          <div key={grade} className="text-sm">
                            <span className="font-medium">{grade}:</span> {count}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )} */}
                
                {/* Gender */}
                {club.memberComposition.gender && (
                  <div className="sm:col-span-2">
                    <h3 className="text-sm font-medium">性別構成</h3>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {Object.entries(club.memberComposition.gender).map(([gender, count]) => 
                        count && (
                          <div key={gender} className="text-sm">
                            <span className="font-medium">{gender}:</span> {count}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
                
                {/* Belonging */}
                {club.memberComposition.belonging && 
                 Object.entries(club.memberComposition.belonging).length > 0 && (
                  <div className="sm:col-span-2">
                    <h3 className="text-sm font-medium">所属構成</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                      {Object.entries(club.memberComposition.belonging).map(([department, percentage]) => (
                        <div key={department} className="text-sm">
                          <span className="font-medium">{department}:</span> {percentage}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Recruitment Info */}
          {club.recruitmentInfo && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">新歓情報</h2>
              {typeof club.recruitmentInfo === 'string' ? (
                <p>{club.recruitmentInfo}</p>
              ) : club.recruitmentInfo.welcomeSchedule ? (
                <div>
                  <h3 className="text-sm font-medium">歓迎スケジュール</h3>
                  <p className="whitespace-pre-line">{club.recruitmentInfo.welcomeSchedule}</p>
                </div>
              ) : null}
            </div>
          )}
          
          {/* Secret Description */}
          {club.secretDescription && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">その他</h2>
              <p>{club.secretDescription}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
