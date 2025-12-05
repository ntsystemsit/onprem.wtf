# Bridgetown Automation: Generate missing tag files
# Run with: bin/bridgetown apply

say_status "Tags", "Scanning posts for tags..."

# Collect all tags from posts
all_tags = Set.new

Dir.glob("src/_posts/**/*.md").each do |post_file|
  content = File.read(post_file)
  
  # Extract front matter
  if content =~ /\A---\s*\n(.*?)\n---/m
    front_matter = $1
    
    # Find tags line
    if front_matter =~ /^tags:\s*(.+)$/
      tags_value = $1.strip
      
      # Handle array format: ["tag1", "tag2"]
      if tags_value.start_with?("[")
        tags = tags_value.gsub(/[\[\]"]/, "").split(",").map(&:strip)
      else
        # Handle space-separated format: tag1 tag2 tag3
        tags = tags_value.split(/\s+/)
      end
      
      tags.reject(&:empty?).each { |tag| all_tags.add(tag) }
    end
  end
end

say_status "Tags", "Found #{all_tags.size} unique tags in posts"

# Get existing tag files
existing_tags = Dir.glob("src/_tags/*.md").map do |file|
  File.basename(file, ".md")
end

say_status "Tags", "Found #{existing_tags.size} existing tag files"

# Find missing tags
missing_tags = all_tags.reject { |tag| existing_tags.include?(tag) }

if missing_tags.empty?
  say_status "Tags", "All tags already have files! Nothing to do.", :green
else
  say_status "Tags", "Creating #{missing_tags.size} missing tag files...", :yellow
  
  missing_tags.sort.each do |tag|
    create_file "src/_tags/#{tag}.md" do
      <<~MARKDOWN
        ---
        title: #{tag}
        ---
      MARKDOWN
    end
  end
  
  say_status "Tags", "Done! Created #{missing_tags.size} tag files.", :green
end

