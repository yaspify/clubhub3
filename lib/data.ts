export interface Club {
    slug: string;
    clubName: string; // Changed from circleName
    verified?: boolean;
    profileImage?: string;
    affiliation?: string;
    memberComposition?: {
        totalMembers?: string;
        gradeLevels?: {
            [key: string]: string;
        };
        gender?: {
            Male?: string;
            Female?: string;
        };
        belonging?: {
            [key: string]: string;
        };
        foundingYear?: string;
    };
    externalLinks?: {
        Instagram?: string;
        LINE?: string;
        X?: string;
        Website?: string;
        Facebook?: string;
        YouTube?: string;
        weighted?: string;
    };
    tags?: string[];
    activityDetails?: {
        summary?: string;
        location?: string;
        frequency?: string;
        record?: string;
        meal?: string; // From the second interface
        membershipFee?: string; // From the second interface
        initialCost?: string; // From the second interface
        feelingPositive?: string; // From the second interface
        feelingNegative?: string; // From the second interface
    };
    recruitmentInfo?: string | {
        welcomeSchedule?: string; // From the second interface
    };
    lastUpdate?: string;
    secretDescription?: string; // From the first interface
}

export const clubs: Club[] = [
    {
        slug: "tennis-club",
        clubName: "テニスクラブ",
        verified: true,
        profileImage: "",
        affiliation: "スポーツ",
        memberComposition: {
            totalMembers: "32名",
            gradeLevels: {
                "1st": "10名",
                "2nd": "8名",
                "3rd": "7名",
                "4th": "7名"
            },
            gender: {
                Male: "18名",
                Female: "14名"
            },
            belonging: {
                "人間社会学域": "40%",
                "理工学域": "45%",
                "医薬保健学域": "15%"
            },
            foundingYear: "1995"
        },
        tags: ["スポーツ", "屋外活動", "大会参加", "体育会系"],
        activityDetails: {
            summary: "年間を通じて大会に参加する競技志向のテニスクラブです。",
            location: "大学テニスコート",
            frequency: "週3回（火・木・土）",
            record: "関東学生テニストーナメント準優勝（2023年）",
            membershipFee: "年間12,000円",
            initialCost: "ラケット代（約15,000円〜）、ユニフォーム（8,000円）",
            feelingPositive: "先輩後輩の仲が良く、アットホームな雰囲気です。テニス初心者でも丁寧に指導します。"
        },
        externalLinks: {
            Instagram: "https://instagram.com/tennisclub",
            LINE: "https://line.me/tennisclub",
            Website: "https://university-tennis.org"
        },
        recruitmentInfo: {
            welcomeSchedule: "4月第1週〜3週の平日 16:00〜18:00（テニスコートにて）"
        },
        lastUpdate: "2024年3月15日"
    },
    {
        slug: "photography-society",
        clubName: "写真サークル",
        verified: true,
        profileImage: "",
        affiliation: "文化系",
        memberComposition: {
            totalMembers: "25名",
            gradeLevels: {
                "1st": "8名",
                "2nd": "7名",
                "3rd": "6名",
                "4th": "4名"
            },
            gender: {
                Male: "13名",
                Female: "12名"
            },
            belonging: {
                "人間社会学域": "60%",
                "理工学域": "30%",
                "医薬保健学域": "10%"
            },
            foundingYear: "2008"
        },
        tags: ["芸術", "創作活動", "文化系", "初心者歓迎"],
        activityDetails: {
            summary: "撮影テクニックを共有し、一緒に撮影ウォークに行く写真愛好家のコミュニティです。",
            location: "芸術棟、201号室",
            frequency: "毎週水曜日 18:00〜20:00、月1回撮影会",
            record: "学内写真展（年2回）、市内ギャラリー展示（年1回）",
            membershipFee: "年間6,000円",
            initialCost: "特になし（自分のカメラがあれば理想的ですが、サークル所有のカメラも貸出可能）",
            feelingPositive: "写真を通して友達ができ、新しい視点で世界を見ることができます。"
        },
        externalLinks: {
            Instagram: "https://instagram.com/photosociety",
            X: "https://x.com/photosociety",
            Website: "https://university-photo.com"
        },
        recruitmentInfo: {
            welcomeSchedule: "4月第2週〜4週の水曜日 18:00〜20:00（芸術棟201号室）"
        },
        lastUpdate: "2024年2月28日"
    },
    {
        slug: "debate-team",
        clubName: "ディベートチーム",
        verified: true,
        profileImage: "",
        affiliation: "学術",
        memberComposition: {
            totalMembers: "18名",
            gradeLevels: {
                "1st": "5名",
                "2nd": "6名",
                "3rd": "4名",
                "4th": "3名"
            },
            gender: {
                Male: "11名",
                Female: "7名"
            },
            belonging: {
                "人間社会学域": "70%",
                "理工学域": "20%",
                "医薬保健学域": "10%"
            },
            foundingYear: "2001"
        },
        tags: ["学術", "大会参加", "スキルアップ"],
        activityDetails: {
            summary: "全国的なディベート大会に参加し、説得力のあるスピーチの技術を練習します。",
            location: "メインホール",
            frequency: "週2回（月・木）19:00〜21:00",
            record: "全国大学ディベート選手権 ベスト8（2023年）",
            membershipFee: "年間5,000円",
            initialCost: "資料代（約3,000円）",
            feelingPositive: "論理的思考力や即興での発言力が鍛えられ、就活にも役立ちます。"
        },
        externalLinks: {
            Instagram: "https://instagram.com/debateteam",
            Website: "https://university-debate.org",
            X: "https://x.com/debateteam"
        },
        recruitmentInfo: {
            welcomeSchedule: "4月10日〜30日の月・木曜日 19:00〜（メインホール）"
        },
        lastUpdate: "2024年3月5日"
    },
    {
        slug: "cooking-club",
        clubName: "料理サークル",
        verified: false,
        profileImage: "",
        affiliation: "趣味",
        memberComposition: {
            totalMembers: "22名",
            gradeLevels: {
                "1st": "7名",
                "2nd": "8名",
                "3rd": "4名",
                "4th": "3名"
            },
            gender: {
                Male: "9名",
                Female: "13名"
            },
            belonging: {
                "人間社会学域": "45%",
                "理工学域": "35%",
                "医薬保健学域": "20%"
            },
            foundingYear: "2015"
        },
        tags: ["ライフスタイル", "社交", "初心者歓迎"],
        activityDetails: {
            summary: "フレンドリーで社交的な環境で、世界各国の料理を学びます。",
            location: "学生会館キッチン",
            frequency: "毎週金曜日 17:00〜20:00",
            membershipFee: "年間3,000円",
            initialCost: "エプロン、三角巾（約1,500円）",
            feelingPositive: "料理のスキルが身につくだけでなく、一緒に食事して親睦を深められます。"
        },
        externalLinks: {
            Instagram: "https://instagram.com/cookingclub",
            LINE: "https://line.me/cookingclub"
        },
        recruitmentInfo: {
            welcomeSchedule: "4月14日、21日、28日 17:00〜（学生会館キッチン）"
        },
        lastUpdate: "2024年3月20日"
    },
    {
        slug: "robotics-society",
        clubName: "ロボティクス研究会",
        verified: false,
        profileImage: "",
        affiliation: "技術",
        memberComposition: {
            totalMembers: "28名",
            gradeLevels: {
                "1st": "8名",
                "2nd": "7名",
                "3rd": "7名",
                "4th": "6名"
            },
            gender: {
                Male: "21名",
                Female: "7名"
            },
            belonging: {
                "理工学域": "85%",
                "人間社会学域": "10%",
                "医薬保健学域": "5%"
            },
            foundingYear: "2005"
        },
        tags: ["テクノロジー", "エンジニアリング", "大会参加", "ものづくり"],
        activityDetails: {
            summary: "様々な大会や展示会のためのロボットを設計、製作、プログラミングします。",
            location: "工学部棟、ラボ3",
            frequency: "毎週ワークショップとオープンラボ時間（火・金 18:00〜22:00）",
            record: "全日本学生ロボコン 準優勝（2023年）",
            membershipFee: "年間12,000円",
            initialCost: "工具セット（約5,000円）",
            feelingPositive: "実践的なエンジニアリングスキルが身につき、就職にも有利です。チームで一つの目標に向かって協力する経験は貴重です。"
        },
        externalLinks: {
            Instagram: "https://instagram.com/roboticssociety",
            Website: "https://robotics-society.edu",
            YouTube: "https://youtube.com/roboticssociety",
        },
        recruitmentInfo: {
            welcomeSchedule: "4月第2週〜第4週の火・金曜日 18:00〜（工学部棟ラボ3）"
        },
        lastUpdate: "2024年3月25日"
    }
];

export const tags: string[] = [
    "文化系", "兼サー可", "初心者歓迎"
]