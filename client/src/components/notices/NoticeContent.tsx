import React from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../../components/ui/sheet";
import { Button } from "../../components/ui/button";
import { DownloadCloud, Edit3, Eye, Trash2 } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { useAuthStore } from "../../store/authStore";

const NoticeContent = ({ notice }) => {
    const role = useAuthStore((state) => state.role);
    console.log("log",role)

   

    return (
        <Card className="flex flex-row items-start justify-between shadow-sm">
            <div className="w-full">
                <CardHeader>
                    <CardTitle>{notice.title}</CardTitle>
                    <CardDescription className="text-justify line-clamp-3">
                        {notice.description}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Posted on: {new Date(notice.createdAt).toLocaleDateString()}</p>
                    {notice.media && notice.media.length > 0 && <p>Media: Available</p>}
                </CardContent>
            </div>
            <CardFooter className="py-3 px-3 flex-col gap-3">
                <Sheet>
                    <SheetTrigger>
                        <Button
                            variant={"outline"}
                            className="border-green-600 dark:border-green-500 rounded-full"
                        >
                            <Eye className="text-xl" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>{notice.title}</SheetTitle>
                            <SheetDescription>
                                <p>{notice.description}</p>
                                {notice.media && notice.media.length > 0 && (
                                    <div className="mt-4">
                                        <p>Media:</p>
                                        {notice.media[0].url ? (
                                            <img
                                                src={notice.media[0].url}
                                                alt="Notice Media"
                                                className="mt-2 max-w-full h-auto"
                                            />
                                        ) : (
                                            <a
                                                href={notice.media[0].url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 underline"
                                            >
                                                View PDF
                                            </a>
                                        )}
                                    </div>
                                )}
                                <p className="mt-4">
                                    Posted on: {new Date(notice.createdAt).toLocaleDateString()}
                                </p>
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
                <Button
                    variant={"outline"}
                    className="border-green-600 dark:border-green-500 rounded-full"
                  
                >
                    <DownloadCloud />
                </Button>
                {(role === "admin" || role === "hod") && (
                    <>
                    <Button
                        variant={"destructive"}
                        className="border-red-600 dark:border-red-500 rounded-full"
                        
                    >
                       
                      <Edit3 />
                    </Button>
                        <Button
                            variant={"destructive"}
                            className="border-red-600 dark:border-red-500 rounded-full"
                            
                        >
                            <Trash2 />
                        </Button>
                    </>
                )}
            </CardFooter>
        </Card>
    );
};

export default NoticeContent;