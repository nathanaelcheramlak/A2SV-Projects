import jobs from "@/app/data";
import type { Job } from "../../types/job";
import Link from "next/link";
import Image from "next/image";

const JobCard = ({ job }: { job: Job }) => (
	<Link href={`/jobs/${job.id}`}>
		<div className="card w-full p-6 bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 rounded-2xl">
			<div className="card-body">
				<div className="flex items-center gap-4">
					<Image
						src={`/job1.png`}
						alt={`${job.company} logo`}
						width={50}
						height={50}
						className="rounded-full"
					/>
					<div>
						<h2 className="card-title text-lg font-semibold">{job.title}</h2>
						<p className="text-sm text-gray-500">
							{job.company} • {job.about.location}
						</p>
					</div>
				</div>
				<p className="text-gray-600 mt-2 text-sm line-clamp-3">
					{job.description}
				</p>
				<div className="card-actions flex gap-4 justify-start mt-4">
					{job.about.categories.map((category) => (
						<div key={category} className="badge badge-outline">
							{category}
						</div>
					))}
				</div>
			</div>
		</div>
	</Link>
);

export default async function JobCardPage() {
	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="max-w-4xl mx-auto">
				<div className="flex justify-between items-center mb-2">
					<h1 className="text-3xl font-bold mb-2">Opportunities</h1>
					<label className="select select-bordered w-full max-w-xs">
						<span className="label">Sort</span>
						<select>
							<option value="relevant">Relevant</option>
							<option value="name">Name</option>
							<option value="date_added">Date Added</option>
						</select>
					</label>
				</div>
				<p className="text-gray-600 mb-6">Showing {jobs.length} results</p>
				<div className="grid grid-cols-1 gap-6">
					{jobs.map((job) => (
						<JobCard key={job.id} job={job} />
					))}
				</div>
			</div>
		</div>
	);
}
