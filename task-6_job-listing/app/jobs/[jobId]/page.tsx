import jobs from "@/app/data";
import { notFound } from "next/navigation";
import {
	FaRegCalendarAlt,
	FaMapMarkerAlt,
	FaCheckCircle,
	FaClock,
	FaRegBuilding,
} from "react-icons/fa";

const getJobById = (jobId: number) => {
	const job = jobs.find((job) => job.id === jobId);
	return job;
};

export default async function JobDetailsPage({
	params,
}: {
	params: { jobId: string };
}) {
	const { jobId } = await params;
	const job = await getJobById(parseInt(jobId, 10));

	if (!job) {
		notFound();
	}

	return (
		<div className="bg-base-200 min-h-screen p-4">
			<div className="max-w-4xl mx-auto bg-blue-300 rounded-lg shadow-lg p-6">
				<h1 className="text-3xl font-bold text-gray-800">
					Applicant Dashboard
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
					<div className="md:col-span-2">
						<div>
							<h2 className="text-xl font-bold mb-2">Description</h2>
							<p className="text-gray-600">{job.description}</p>
						</div>

						<div className="mt-6">
							<h2 className="text-xl font-bold mb-3">Responsibilities</h2>
							<ul className="space-y-2">
								{job.responsibilities.map((resp, index) => (
									<li key={index} className="flex items-start">
										<FaCheckCircle className="text-green-500 mt-1 mr-3" />
										<span className="text-gray-600">{resp}</span>
									</li>
								))}
							</ul>
						</div>

						<div className="mt-6">
							<h2 className="text-xl font-bold mb-2">
								Ideal Candidate We Want
							</h2>
							<p className="text-gray-600 mb-3">
								<strong>{`Young (${job.ideal_candidate.age} year old) ${job.ideal_candidate.gender} social media manager`}</strong>
							</p>
							<ul className="space-y-3">
								{job.ideal_candidate.traits.map((trait, index) => (
									<li
										key={index}
										className="text-gray-600"
										dangerouslySetInnerHTML={{
											__html: trait.replace(/^(.*?):/, "<strong>$1</strong>:"),
										}}
									/>
								))}
							</ul>
						</div>

						<div className="mt-6">
							<h2 className="text-xl font-bold mb-2">When & Where</h2>
							<div className="flex items-center text-gray-600">
								<FaMapMarkerAlt className="mr-3" />
								<span>{job.when_where}</span>
							</div>
						</div>
					</div>

					<div>
						<div className="bg-gray-50 p-4 rounded-2xl border">
							<h3 className="text-lg font-bold mb-4">About</h3>
							<ul className="space-y-3 text-gray-600 text-sm">
								<li className="flex items-center">
									<FaClock className="mr-3 text-blue-500" />{" "}
									<strong>Posted On:</strong>{" "}
									<span className="ml-auto">{job.about.posted_on}</span>
								</li>
								<li className="flex items-center">
									<FaRegCalendarAlt className="mr-3 text-red-500" />{" "}
									<strong>Deadline:</strong>{" "}
									<span className="ml-auto">{job.about.deadline}</span>
								</li>
								<li className="flex items-center">
									<FaMapMarkerAlt className="mr-3 text-green-500" />{" "}
									<strong>Location:</strong>{" "}
									<span className="ml-auto">{job.about.location}</span>
								</li>
								<li className="flex items-center">
									<FaRegBuilding className="mr-3 text-purple-500" />{" "}
									<strong>Start Date:</strong>{" "}
									<span className="ml-auto">{job.about.start_date}</span>
								</li>
							</ul>
						</div>

						<div className="mt-6">
							<h3 className="text-lg font-bold mb-2">Categories</h3>
							<div className="flex flex-wrap gap-2">
								{job.about.categories.map((cat) => (
									<div key={cat} className="badge badge-accent badge-outline  border border-green-500 border-solid rounded-lg">
										{cat}
									</div>
								))}
							</div>
						</div>

						<div className="mt-6">
							<h3 className="text-lg font-bold mb-2">Required Skills</h3>
							<div className="flex flex-wrap gap-2">
								{job.about.required_skills.map((skill) => (
									<div key={skill} className="badge badge-info badge-outline">
										{skill}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export async function generateStaticParams() {
	return jobs.map((job) => ({
		jobId: job.id.toString(),
	}));
}
