"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentInfo } from "./DocumentInfo";

import { Card, CardContent } from "@/components/ui/card";
import { ledgerType } from "@/types/ledger";
import { CarrierInfo } from "./CarrierInfo";
import { MetadataInfo } from "./MetadataInfo";

import { ScrollArea } from "@/components/ui/scroll-area";
import { documentPages } from "@/constants/ledgermockdata";
import { DocumentThumbnail } from "./DocumentThumbnail";

// Mock document pages for demonstration
// const documentPages = [
//   "/docs/user-manual.pdf",  // Replace with actual image paths
//   "/path/to/page2.jpg",
//   "/path/to/page3.jpg"
// ];
export const DocumentDetail: React.FC<{ data: ledgerType }> = ({ data }) => {
	const [activeTab, setActiveTab] = useState("document");
	const [selectedPage, setSelectedPage] = useState(0);

	return (
		<div className="container mx-auto p-4">
			<div className="grid grid-cols-3 gap-4">
				<div className="col-span-2">
					<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
						<TabsList className="grid w-full grid-cols-3">
							<TabsTrigger value="document">Document</TabsTrigger>
							<TabsTrigger value="carrier">Carrier</TabsTrigger>
							<TabsTrigger value="metadata">Metadata</TabsTrigger>
						</TabsList>
						<TabsContent value="document">
							<DocumentInfo data={data} />
						</TabsContent>
						<TabsContent value="carrier">
							<CarrierInfo data={data} />
						</TabsContent>
						<TabsContent value="metadata">
							<MetadataInfo data={data} />
						</TabsContent>
					</Tabs>
				</div>
				<div className="col-span-1">
					{/* {activeTab === "document" && (
						<Card>
							<CardContent className="p-4">
								<h2 className="mb-4 text-xl font-semibold">Document Preview</h2>
								<div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg bg-gray-200">
									<img
										src="/placeholder.svg?height=400&width=300"
										alt="Document Preview"
										className="h-full w-full object-cover"
									/>
								</div>
							</CardContent>
						</Card>
					)} */}
					{/* <DocumentPreviewCard fileType="pdf" fileName="Sample Document.pdf" /> */}
					<Card>
						<CardContent className="p-4">
							<h2 className="mb-4 text-xl font-semibold">Document Pages</h2>
							<ScrollArea className="h-[600px] pr-4">
								<div className="grid grid-cols-1 gap-2">
									{documentPages.map((page, index) => (
										<DocumentThumbnail
											key={index}
											pageNumber={index + 1}
											imageUrl={page}
											isSelected={selectedPage === index}
											onClick={() => setSelectedPage(index)}
										/>
									))}
								</div>
							</ScrollArea>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};
