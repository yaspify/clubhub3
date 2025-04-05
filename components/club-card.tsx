"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { Club } from "@/lib/data";
import Image from "next/image";
import { CheckCircle, Eye, Instagram } from "lucide-react";

export default function ClubCard({ club }: { club?: Club }) {
  // If club is undefined, show a placeholder
  if (!club) {
    return (
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-center h-24">
            <p className="text-muted-foreground">Club information unavailable</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card key={club.slug} className="overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full py-0 gap-0">
      <CardContent className="p-4 flex-grow">
        <div className="flex items-start gap-4">
          <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            {club.profileImage ? (
              <Image
                src={club.profileImage || "/placeholder.svg"}
                alt={club.clubName || "Club"}
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full text-sm font-medium text-muted-foreground">
                {(club.clubName || "Club").substring(0, 5)}
              </div>
            )}
            {club.verified && (
              <div className="absolute bottom-0 right-0 bg-green-500 text-white p-1 rounded-tl-lg">
                <CheckCircle className="h-3 w-3" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-lg line-clamp-2">{club.clubName || "Unnamed Club"}</h3>
            <p className="text-sm text-muted-foreground line-clamp-3 mt-2">
              {club.activityDetails?.summary || "No description available"}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-0 mt-auto">
        <div className="grid grid-cols-2 w-full divide-x border-t">
          {club.verified && (
            <Link
              href={`/club/${club.slug}`}
              className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
            >
              <Eye className="h-4 w-4" />
              <span>詳しくみる</span>
            </Link>
          )}

          {club.externalLinks?.Instagram && (
            <Link
              href={club.externalLinks.Instagram}
              className={`flex items-center justify-center gap-2 py-3 text-sm font-medium text-pink-600 hover:bg-pink-50 transition-colors ${!club.verified ? "col-span-2" : ""}`}
            >
              <Instagram className="h-4 w-4" />
              <span>Instagram</span>
            </Link>
          )}

          {!club.verified && !club.externalLinks?.Instagram && (
            <div className="col-span-2 py-3 text-center text-sm text-muted-foreground">アクションは後日追加されます</div>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}