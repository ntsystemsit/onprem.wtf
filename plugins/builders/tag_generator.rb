# Automatically generates missing tag files during build
class Builders::TagGenerator < SiteBuilder
  def build
    generator do
      generate_missing_tags
    end
  end

  def generate_missing_tags
    # Collect all tags from posts
    all_tags = Set.new
    
    site.collections.posts.resources.each do |post|
      tags = post.data[:tags]
      next unless tags
      
      # Handle both array and space-separated string formats
      tag_list = case tags
                 when Array then tags
                 when String then tags.split(/\s+/)
                 else []
                 end
      
      tag_list.reject(&:empty?).each { |tag| all_tags.add(tag) }
    end

    # Get existing tag files
    existing_tags = site.collections.tags.resources.map do |tag_resource|
      tag_resource.data[:title]
    end.compact

    # Find and create missing tags
    missing_tags = all_tags.reject { |tag| existing_tags.include?(tag) }

    missing_tags.each do |tag|
      Bridgetown.logger.info "TagGenerator:", "Creating tag file for '#{tag}'"
      
      # Write the tag file
      tag_path = File.join(site.source, "_tags", "#{tag}.md")
      File.write(tag_path, <<~MARKDOWN)
        ---
        title: #{tag}
        ---
      MARKDOWN
    end

    Bridgetown.logger.info "TagGenerator:", "Created #{missing_tags.size} tag files" if missing_tags.any?
  end
end

