all:
	bower install
	cake build
	cake clean

clean:
	cake clean
	rm -rf bower_components