import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Club } from "@/lib/data";

export default function ClubCard({ club }: { club: Club }) {
  return (
    <Card key={club.slug}>
      <CardHeader>
        <CardTitle>{club.clubName}</CardTitle>
        <CardDescription>
          {club.verified && (
            <Badge variant="outline" className="mt-2">
              認証済み
            </Badge>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2">
          {club.activityDetails && club.activityDetails.summary ? club.activityDetails.summary : "No summary available"}
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/club/${club.slug}`} className={buttonVariants()}>詳しくみる</Link>
      </CardFooter>
    </Card>
  );
}